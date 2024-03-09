import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { findUserById } from '~/migrations/users.server';
import { destroySession, getSession } from '~/sessions';

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dashboard: welcome {user.username}</h1>
      <Form method="post">
        <button type="submit">Log Out</button>
      </Form>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  // parse token cookie from headers
  const userId = session.get('userId');

  if (!userId) {
    throw redirect('/login');
  }

  const user = await findUserById(userId);
  if (!user) {
    throw redirect('/login', { status: 302, headers: { 'Set-Cookie': await destroySession(session) } });
  }
  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookies'));
  return redirect('/login', { headers: { 'Set-Cookie': await destroySession(session) } });
}
