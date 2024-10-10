import { ErrorCode, MetamaskErrorCode, TxError } from '@/lib/errors/error-dictionary';
import { bonderUsdcConfig, useReadBonderUsdcDecimals } from '@/lib/web3/generated';
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

  const { isConnected } = useAccount();
  const { data: decimals } = useReadBonderUsdcDecimals();

  const handleBuy = async () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first');
      return ErrorCode.WALLET_NOT_CONNECTED;
    }

    if (amount <= 0) return ErrorCode.INVALID_AMOUNT;
    setPending(true);
    const parsedAmount = parseUnits(amount.toString(), decimals ?? 0);

    let betHash: Address | null = null;
    try {
      betHash = await writeTx(parsedAmount);
    } catch (error: any) {
      if (!error.message.includes(MetamaskErrorCode.InsufficientFunds)) {
        setPending(false);
        toast.error(error.message);
        return MetamaskErrorCode.ContractFunctionExecutionError;
      }

      // Catch rejection in later step
      try {
        const approvalHash = await writeContract(wagmiClientConfig, {
          ...bonderUsdcConfig,
          functionName: 'approve',
          args: [approvalAddress, parsedAmount],
        });
        await waitForTransactionReceipt(wagmiClientConfig, { hash: approvalHash });
        betHash = await writeTx(parsedAmount);
        await waitForTransactionReceipt(wagmiClientConfig, { hash: betHash });
      } catch (error: any) {
        if ((error as TxError).name === MetamaskErrorCode.ContractFunctionExecutionError) {
          setPending(false);
          toast.error(error.message);
          return MetamaskErrorCode.ContractFunctionExecutionError;
        }
      }
    }
    setPending(false);
    return { betHash, amount: parsedAmount };
  };

  return { amount, setAmount, pending, handleBuy };
}
