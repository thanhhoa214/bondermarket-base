'use server';

import { ironSessionOptions, SessionData } from '@/lib/iron-session/config';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function startSession(address: string) {
  const session = await getIronSession<SessionData>(cookies(), ironSessionOptions);
  session.address = address;
  await session.save();
  return true;
}

export async function endSession() {
  const session = await getIronSession<SessionData>(cookies(), ironSessionOptions);
  session.destroy();
  await session.save();
  return true;
}
