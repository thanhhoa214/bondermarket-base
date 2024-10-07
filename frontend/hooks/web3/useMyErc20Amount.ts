import { useAccount } from 'wagmi';
import { useErc20Amount } from './useErc20Amount';

export function useMyErc20Amount(tokenAddress?: string) {
  const { address } = useAccount();
  const balance = useErc20Amount(tokenAddress, address);

  if (!address) return { ...balance, data: 0 };
  return balance;
}
