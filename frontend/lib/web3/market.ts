import { IpfsMarketData } from '@/app/create/util';
import { Address } from 'viem';
import { baseSepolia } from 'viem/chains';
import { createConfig, http } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { bonderV1BetFactoryConfig } from './generated';

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  ssr: true,
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/MntzabqU0UcODnygA4tXlrTDpguE57gb'),
  },
});

export interface Market {
  id: bigint;
  betDescription: string;
  creator: string;
  expiryTime: bigint;
  stage: number;
  result: bigint;
  disputed: boolean;
  bonderFee: bigint;
  claimAmt: bigint;
  totalDeposited: bigint;
  yesBonds: bigint;
  noBonds: bigint;
  yesToken: Address;
  noToken: Address;
  yesLp: Address;
  noLp: Address;
  metadata: IpfsMarketData;
}

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
    ...bonderV1BetFactoryConfig,
    functionName: 'betId',
  });

  //   send multiple read requests to get bet details from 0 to betId
  return Promise.all(Array.from({ length: Number(betId) }, (_, i) => getMarketById(Number(betId) - i)));
}

export async function getMarketById(id: number) {
  const market = await readContract(wagmiConfig, {
    ...bonderV1BetFactoryConfig,
    functionName: 'idToBet',
    args: [BigInt(id)],
  });

  const metadata: IpfsMarketData = await fetch(
    `https://aquamarine-causal-albatross-713.mypinata.cloud/ipfs/${market[1]}`,
  )
    .then((res) => res.json())
    .catch(() => ({ title: 'Untitled Market', context: 'No context' }));

  //   { name: 'id', internalType: 'uint256', type: 'uint256' },
  //   { name: 'betDescription', internalType: 'string', type: 'string' },
  //   { name: 'creator', internalType: 'address', type: 'address' },
  //   { name: 'expiryTime', internalType: 'uint256', type: 'uint256' },
  //   { name: 'stage', internalType: 'enum BonderV1BetFactory.Stages', type: 'uint8' },
  //   { name: 'result', internalType: 'uint256', type: 'uint256' },
  //   { name: 'disputed', internalType: 'bool', type: 'bool' },
  //   { name: 'bonderFee', internalType: 'uint256', type: 'uint256' },
  //   { name: 'claimAmt', internalType: 'uint256', type: 'uint256' },
  //   { name: 'totalDeposited', internalType: 'uint256', type: 'uint256' },
  //   { name: 'yesBonds', internalType: 'uint256', type: 'uint256' },
  //   { name: 'noBonds', internalType: 'uint256', type: 'uint256' },
  //   { name: 'yesToken', internalType: 'address', type: 'address' },
  //   { name: 'noToken', internalType: 'address', type: 'address' },
  //   { name: 'yesLp', internalType: 'address', type: 'address' },
  //   { name: 'noLp', internalType: 'address', type: 'address' },
  return {
    id: market[0],
    betDescription: market[1],
    creator: market[2],
    expiryTime: market[3],
    stage: market[4],
    result: market[5],
    disputed: market[6],
    bonderFee: market[7],
    claimAmt: market[8],
    totalDeposited: market[9],
    yesBonds: market[10],
    noBonds: market[11],
    yesToken: market[12],
    noToken: market[13],
    yesLp: market[14],
    noLp: market[15],
    metadata,
  };
}
