import { bonderUsdcAbi } from '@/lib/web3/generated';
import { Address, formatUnits } from 'viem';
import { createUseReadContract } from 'wagmi/codegen';

/**
 * Amount of ERC20 token for the given tracking address.
 * Amount means already formatted in human readable format with processed decimals.
 */
export const useTotalMinted = (erc20Address?: string, trackingAddress?: Address) => {
  // const { data: decimals } = createUseReadContract({
  //   abi: bonderUsdcAbi,
  //   address: erc20Address as Address | undefined,
  //   functionName: 'decimals',
  // })({ query: { enabled: !!erc20Address } });

  const { data: rawBalance, ...rest } = createUseReadContract({
    abi: bonderUsdcAbi,
    address: erc20Address as Address | undefined,
    functionName: 'balanceOf',
  })({ args: [trackingAddress!], query: { enabled: !!erc20Address && !!trackingAddress } });

  const balance = rawBalance === undefined ? undefined : Number(formatUnits(rawBalance, Number(18)));
  
  const { data: rawTotalMinted } = createUseReadContract({
    abi: bonderUsdcAbi,
    address: erc20Address as Address | undefined,
    functionName: 'totalMinted',
  })({ query: { enabled: !!erc20Address } });

  const totalMinted = rawTotalMinted === undefined ? undefined : Number(formatUnits(rawTotalMinted, Number(18)));

  
  return { data: balance, totalMinted, ...rest };
};


