import { zero } from '@/lib/web3/erc20';
import {
  bonderBaseUsdcAddress,
  useReadBonderBaseUsdcDecimals,
  useWriteBonderV1RouterRemoveLiquidity,
} from '@/lib/web3/generated';
import { wagmiClientConfig } from '@/lib/web3/wagmiConfig';
import { readContract } from '@wagmi/core';
import { Address, erc20Abi, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

// TokenB is USDC
export function useRouterRemoveLiquidity() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteBonderV1RouterRemoveLiquidity();
  const { data: decimalsUsdc } = useReadBonderBaseUsdcDecimals();

  return async function (tokenA: Address | string, amountA: number, amountB: number) {
    if (address && amountA && amountB) {
      const tokenADecimals = await readContract(wagmiClientConfig, {
        abi: erc20Abi,
        address: tokenA as Address,
        functionName: 'decimals',
      });
      const amountAWithDecimals = amountA && tokenADecimals ? parseUnits(`${amountA}`, tokenADecimals) : zero;
      const amountBWithDecimals = amountB && decimalsUsdc ? parseUnits(`${amountB}`, decimalsUsdc) : zero;
      console.log({ tokenA, amountAWithDecimals, amountBWithDecimals, address });

      return await writeContractAsync({
        args: [
          tokenA as Address,
          bonderBaseUsdcAddress,
          amountAWithDecimals,
          amountAWithDecimals,
          amountBWithDecimals,
          address,
          BigInt(Date.now() + 1000 * 60 * 10),
        ],
      });
    } else {
      throw new Error('Missing required parameters');
    }
  };
}
