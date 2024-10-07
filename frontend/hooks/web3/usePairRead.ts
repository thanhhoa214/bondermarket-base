import { bonderV1PairAbi } from '@/lib/web3/generated';
import { Address } from 'viem';
import { createUseReadContract } from 'wagmi/codegen';

export function usePairRead(address?: Address | string) {
  return createUseReadContract({ abi: bonderV1PairAbi, address: address as Address });
}
