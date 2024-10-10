'use client';
import { useReadBonderUsdcBalanceOf, useReadBonderUsdcDecimals } from '@/lib/web3/generated';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useErc20Amount } from './useErc20Amount';

export function useMyUsdcAmount() {
  const { address } = useAccount();
  const { data: rawUsdcAmount, ...rest } = useReadBonderUsdcBalanceOf({ args: [address!] });
  const { data: decimals } = useReadBonderUsdcDecimals();
  if (!address) return { data: 0, ...rest };
  return { data: rawUsdcAmount ? Number(formatUnits(rawUsdcAmount, Number(decimals ?? 18))) : undefined, ...rest };
}

export function useMyErc20Amount(tokenAddress?: string) {
  const { address } = useAccount();
  const balance = useErc20Amount(tokenAddress, address);
  if (!address) return { ...balance, data: 0 };
  return balance;
}
