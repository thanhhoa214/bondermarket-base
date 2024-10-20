import { USDC_DECIMALS } from '@/lib/web3/erc20';
import { bonderUsdcAbi } from '@/lib/web3/generated';
import { Address, formatUnits } from 'viem';
import { createUseReadContract } from 'wagmi/codegen';

/**
 * Total supply of tokens minted.
 * Amount means already formatted in human readable format with processed decimals.
 * Be aware that this uses the USDC_DECIMALS constant to format the amount.
 */
export const useTotalMinted = (erc20Address?: string) => {
  const { data: rawTotalMinted, ...rest } = createUseReadContract({
    abi: bonderUsdcAbi,
    address: erc20Address as Address | undefined,
    functionName: 'totalMinted',
  })({ query: { enabled: !!erc20Address } });

  const totalMinted =
    rawTotalMinted === undefined ? undefined : Number(formatUnits(rawTotalMinted, Number(USDC_DECIMALS)));

  return { data: totalMinted, ...rest };
};
