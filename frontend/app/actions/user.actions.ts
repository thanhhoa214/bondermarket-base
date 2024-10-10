'use server';

import { ironSessionOptions, SessionData } from '@/lib/iron-session/config';
import { faucetAddress } from '@/lib/web3/faucet';
import { kv } from '@vercel/kv';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { Address } from 'viem';

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

export interface User {
  faucetted: boolean;
}

export async function faucetUser(address: Address) {
  const user = await kv.get<User>(address);
  if (user && user.faucetted)
    return { success: false, error: { message: 'User already faucetted', code: 400 } } as const;

  try {
    const faucetTxs = await faucetAddress(address);
    await kv.set<User>(address, { faucetted: true });
    return { success: true, data: faucetTxs } as const;
  } catch (error) {
    console.log(error);
    return { success: false, error: { message: 'Internal server error', code: 500 } } as const;
  }
}

export async function getUser(address: Address) {
  const user = await kv.get<User>(address);
  return { success: true, data: user } as const;
}
