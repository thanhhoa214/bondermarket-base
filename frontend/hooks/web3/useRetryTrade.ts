import { zero } from '@/lib/web3/erc20';
import { bonderV1BetFactoryConfig } from '@/lib/web3/generated';
import { Market } from '@/lib/web3/market';
import { wagmiClientConfig } from '@/lib/web3/wagmiConfig';
import { writeContract } from '@wagmi/core';
import { ContractFunctionName } from 'viem';
import { useSide } from '../useSide';
import { TradeType } from '../useTradeType';
import { useRetryInsufficientFund } from './useRetryInsufficientFund';

export function useRetryTrade({ marketId, tradeType }: { marketId?: Market['id']; tradeType: TradeType }) {
  const [side, setSide] = useSide('yes');
  const { amount, setAmount, handleBuy, pending } = useRetryInsufficientFund({
    approvalAddress: bonderV1BetFactoryConfig.address,
    writeTx: (amount) => {
      let functionName: ContractFunctionName<typeof bonderV1BetFactoryConfig.abi>;
      if (tradeType === 'bet') functionName = side === 'yes' ? 'buyYes' : 'buyNo';
      else functionName = side === 'yes' ? 'bondYes' : 'bondNo';

      return writeContract(wagmiClientConfig, {
        ...bonderV1BetFactoryConfig,
        functionName,
        args: [marketId ?? zero, amount],
      });
    },
  });

  return { side, setSide, amount, setAmount, pending, handleBuy };
}
