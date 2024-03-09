import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form as FForm, FormControl, FormDescription, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { createUser, findUserByUsername } from '~/migrations/users.server';
import { commitSession, getSession } from '~/sessions';

export default function Login() {
  const actionData = useActionData<typeof action>();
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <Form method="post" className="p-4 container md:max-w-md">
      <FForm {...form}>
        <div className="flex gap-4 flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Usuario</FormLabel>
                <FormControl>
                  <Input type="text" id="username" name="username" required />
                </FormControl>
                <FormDescription>Este será tu nombre público</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" id="password" name="password" required />
                </FormControl>
                <FormDescription>Minimo 8 caracteres</FormDescription>
              </FormItem>
            )}
          />
        </div>
      </FForm>

      <div className="flex gap-2 mt-4">
        <Button type="submit" name="action" value="signin" className="flex-1">
          Log In
        </Button>
        <Button type="submit" name="action" value="signup" className="flex-1">
          Sign up
        </Button>
      </div>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const headers = request.headers;
  const actionType = formData.get('action');

  switch (actionType) {
    case 'signin':
      return handleLogIn(formData, headers);
    case 'signup':
      return handleSignUp(formData, headers);
    default:
      return json({ message: 'Bad Request' }, { status: 400, headers: { Location: '/login' } });
  }
}

async function handleLogIn(formData: FormData, headers: Headers) {
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));

  if (!username || !password) {
    return json(
      { message: 'Please enter a valid username and password' },
      { status: 400, headers: { Location: '/login' } }
    );
  }

  const user = await findUserByUsername(username);
  console.log(user);
  if (!user) {
    return json({ message: 'Invalid username or password' }, { status: 401, headers: { Location: '/login' } });
  }

  if (user.password !== password) {
    return json({ message: 'Invalid username or password' }, { status: 401, headers: { Location: '/login' } });
  }
  let session = await getSession(headers.get('Cookie'));
  session.set('userId', user.user_id);
  return redirect('/dashboard', { status: 302, headers: { 'Set-Cookie': await commitSession(session) } });
}

async function handleSignUp(formData: FormData, headers: Headers) {
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));

  if (typeof username !== 'string' || typeof password !== 'string') {
    return json(
      { message: 'Please enter a valid username and password' },
      { status: 400, headers: { Location: '/login' } }
    );
  }
  // check if username is taken
  const user = await findUserByUsername(username);
  if (user) {
    return json({ message: 'Username is already taken' }, { status: 400, headers: { Location: '/login' } });
  }

  const result = await createUser(username, password);

  let session = await getSession(headers.get('Cookie'));
  session.set('userId', result);
  return redirect('/dashboard', { headers: { 'Set-Cookie': await commitSession(session) } });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');
  if (userId) {
    return redirect('/dashboard');
  }
  return 200;
}
