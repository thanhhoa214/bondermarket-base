import { ErrorCode, MetamaskErrorCode, TxError } from '@/lib/errors/error-dictionary';
import { USDC_DECIMALS, zero } from '@/lib/web3/erc20';
import { bonderUsdcConfig, useReadBonderUsdcAllowance, useReadBonderUsdcBalanceOf } from '@/lib/web3/generated';
import { wagmiClientConfig } from '@/lib/web3/wagmiConfig';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { Address, parseUnits } from 'viem';
import { useAccount } from 'wagmi';

/**
 * Retry 1st transaction if it fails due to insufficient funds. Auto request `approve` 1st if needed.
 * TODO: Add success notification callback here
 */
export function useRetryInsufficientFund({
  approvalAddress,
  writeTx,
}: {
  approvalAddress: Address;
  writeTx: (amount: bigint) => Promise<Address>;
}) {
  const [amount, setAmount] = useState(0);
  const [pending, setPending] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: approvalAmount } = useReadBonderUsdcAllowance({
    args: [address!, approvalAddress],
    query: { enabled: !!address },
  });
  const { data: balance = zero } = useReadBonderUsdcBalanceOf({ args: [approvalAddress] });

  const handleBuy = async () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first');
      return ErrorCode.WALLET_NOT_CONNECTED;
    }

    if (amount <= 0) return ErrorCode.INVALID_AMOUNT;
    setPending(true);
    const parsedAmount = parseUnits(amount.toString(), USDC_DECIMALS);

    try {
      if ((approvalAmount || zero) < parsedAmount) {
        const approvalHash = await writeContract(wagmiClientConfig, {
          ...bonderUsdcConfig,
          functionName: 'approve',
          args: [approvalAddress, balance],
        });
        await waitForTransactionReceipt(wagmiClientConfig, { hash: approvalHash });
      }
      const betHash = await writeTx(parsedAmount);
      await waitForTransactionReceipt(wagmiClientConfig, { hash: betHash });
      setPending(false);
      return { betHash, amount: parsedAmount };
    } catch (error: any) {
      if ((error as TxError).name === MetamaskErrorCode.ContractFunctionExecutionError) {
        setPending(false);
        toast.error(error.message);
        return MetamaskErrorCode.ContractFunctionExecutionError;
      }
    }
  };

  return { amount, setAmount, pending, handleBuy };
}
