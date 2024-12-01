import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number;
}

export const getSession = () => {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'user-info',
    password: process.env.COOKIE_PASSWORD!,
  });
};
