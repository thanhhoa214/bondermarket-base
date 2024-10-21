'use server';

import { pinataSdk } from '@/lib/pinata';
import { revalidatePath } from 'next/cache';
import { keccak256, toBytes } from 'viem';
import { IpfsMarketData } from '../create/util';

export async function createMarket(market: IpfsMarketData) {
  const hash = keccak256(toBytes(market.title)).slice(2, 12);
  const { IpfsHash } = await pinataSdk.pinJSONToIPFS(market, {
    pinataMetadata: { name: `${hash}.json` },
  });
  return IpfsHash;
}

export async function refreshMarketPage() {
  revalidatePath('/');
}
