import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import env from '../env/private';

export const ironSessionOptions = {
  password: env.SESSION_SECRET, // Use a strong secret
  cookieName: 'wallet_session',
  cookieOptions: { secure: env.NODE_ENV === 'production' },
};

export interface SessionData {
  chainId: number;
  address: string;
}

export function getSession() {
  return getIronSession<SessionData>(cookies(), ironSessionOptions);
}
