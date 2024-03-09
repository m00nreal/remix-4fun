import { createCookie, createMemorySessionStorage } from '@remix-run/node';

const sessionCookie = createCookie('__session', {
  secrets: ['r3m1xr0ck5'],
  sameSite: true,
});

const { getSession, commitSession, destroySession } = createMemorySessionStorage({
  cookie: sessionCookie,
});

export { commitSession, destroySession, getSession };
