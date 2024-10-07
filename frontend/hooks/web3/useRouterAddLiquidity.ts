import { zero } from '@/lib/web3/erc20';
import {
  bonderBaseUsdcAddress,
  bonderV1RouterAddress,
  useReadBonderBaseUsdcDecimals,
  useWriteBonderBaseUsdcApprove,
  useWriteBonderV1RouterAddLiquidity,
} from '@/lib/web3/generated';
import { wagmiClientConfig } from '@/lib/web3/wagmiConfig';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { Address, erc20Abi, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

// TokenB is USDC
export function useRouterAddLiquidity() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteBonderV1RouterAddLiquidity();
  const { data: decimalsUsdc } = useReadBonderBaseUsdcDecimals();
  const { writeContractAsync: approveUsdc } = useWriteBonderBaseUsdcApprove();

  return async function (tokenA: Address | string, amountA: number, amountB: number) {
    if (address && tokenA && amountA && amountB) {
      const tokenADecimals = await readContract(wagmiClientConfig, {
        abi: erc20Abi,
        address: tokenA as Address,
        functionName: 'decimals',
      });
      const amountAWithDecimals = amountA && tokenADecimals ? parseUnits(`${amountA}`, tokenADecimals) : zero;
      const amountBWithDecimals = amountB && decimalsUsdc ? parseUnits(`${amountB}`, decimalsUsdc) : zero;

      const approvalTokenHash = await writeContract(wagmiClientConfig, {
        abi: erc20Abi,
        address: tokenA as Address,
        functionName: 'approve',
        args: [bonderV1RouterAddress, amountAWithDecimals],
      });
      await waitForTransactionReceipt(wagmiClientConfig, { hash: approvalTokenHash });
      const approvalUsdcHash = await approveUsdc({ args: [bonderV1RouterAddress, amountAWithDecimals] });
      await waitForTransactionReceipt(wagmiClientConfig, { hash: approvalUsdcHash });

      return await writeContractAsync({
        args: [
          tokenA as Address,
          bonderBaseUsdcAddress,
          amountAWithDecimals,
          amountBWithDecimals,
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
