import { zero } from '@/lib/web3/erc20';
import { bonderV1YesNoFactoryConfig } from '@/lib/web3/generated';
import { Market } from '@/lib/web3/market';
import { wagmiClientConfig } from '@/lib/web3/wagmiConfig';
import { writeContract } from '@wagmi/core';
import { useSide } from '../useSide';
import { useRetryInsufficientFund } from './useRetryInsufficientFund';

export function useRetryTrade({ marketId }: { marketId?: Market['betId'] }) {
  const [side, setSide] = useSide('yes');
  const { amount, setAmount, handleBuy, pending } = useRetryInsufficientFund({
    approvalAddress: bonderV1YesNoFactoryConfig.address,
    writeTx: (amount) => {
      const functionName = side === 'yes' ? 'buyYes' : 'buyNo';

      return writeContract(wagmiClientConfig, {
        ...bonderV1YesNoFactoryConfig,
        functionName,
        args: [marketId ?? zero, amount],
      });
    },
  });

  return { side, setSide, amount, setAmount, pending, handleBuy };
}
