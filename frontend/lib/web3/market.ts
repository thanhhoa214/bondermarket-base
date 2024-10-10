import { IpfsMarketData } from '@/app/create/util';
import { baseSepolia } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { bonderV1YesNoFactoryConfig } from './generated';

type PromiseReturnType<T> = T extends Promise<infer R> ? R : never;

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/MntzabqU0UcODnygA4tXlrTDpguE57gb'),
  },
});

export type MarketDetail = PromiseReturnType<ReturnType<typeof getMarketById>>;
export type Market = MarketDetail['market'];
export type Markets = Market[];

export enum Stages {
  Bet, // new bet is created
  Validate, // time has expired. Time to bond
  Dispute, // If dispute threshold is hit
  Claim, // If no dispute, claim. If dispute, once Council bonds, claim
}

export async function getMarkets() {
  // get betId from bet_market contract
  const betId = await readContract(wagmiConfig, {
    ...bonderV1YesNoFactoryConfig,
    functionName: 'totalBets',
  });

  //   send multiple read requests to get bet details from 0 to betId
  return Promise.all(Array.from({ length: Number(betId) }, (_, i) => getMarketById(Number(betId) - i)));
}

export async function getMarketById(id: number) {
  const market = await readContract(wagmiConfig, {
    ...bonderV1YesNoFactoryConfig,
    functionName: 'getBetStruct',
    args: [BigInt(id)],
  });

  const metadata: IpfsMarketData = await fetch(
    `https://aquamarine-causal-albatross-713.mypinata.cloud/ipfs/${market.betCid}`,
  )
    .then((res) => res.json())
    .catch(() => ({ title: 'Untitled Market', context: 'No context' }));

  return { market, metadata };
}
