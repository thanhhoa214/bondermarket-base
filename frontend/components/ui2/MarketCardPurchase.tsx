'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TxLink from '@/components/ui2/TxLink';
import { Side } from '@/hooks/useSide';
import { TradeType } from '@/hooks/useTradeType';
import { useRetryTrade } from '@/hooks/web3/useRetryTrade';
import { cn } from '@/lib/utils';
import { Stages } from '@/lib/web3/market';
import { startCase } from 'lodash-es';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import LoaderIcon from './LoaderIcon';

export default function MarketCardPurchase({
  onBack,
  stage,
  side,
  tradeType,
  betId,
  ...props
}: {
  stage: Stages;
  side: Side;
  tradeType?: TradeType;
  betId: bigint;
  onBack: VoidFunction;
}) {
  const { amount, setAmount, handleBuy, pending } = useRetryTrade({ marketId: betId, defaultSide: side });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const result = await handleBuy();
      if (typeof result === 'object') {
        toast.success(
          <p>
            You&apos;ve successfully bought <strong>{amount}</strong> shares of <strong>{side}</strong>. Your
            transaction detail is
            <TxLink hash={result.betHash} className="ml-2" />
          </p>,
        );
        onBack();
      }
    } catch (error) {
      toast.error('Trade failed. Please try again.');
    }
  };

  return (
    <form {...props} onSubmit={onSubmit} className={cn('space-y-2')}>
      <CardContent>
        <div className="flex gap-2">
          <div className="relative">
            <Input
              placeholder="Amount"
              max={400}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-32 font-semibold text-xl pr-8"
            />
            <Button
              variant={'outline'}
              type="button"
              className="absolute top-2 right-2 h-6 py-1 px-1.5 rounded-sm text-xs text-muted-foreground bg-foreground/5"
              onClick={() => setAmount(Math.min(amount + 10, 400))}
            >
              +10
            </Button>
          </div>
          <Slider value={[amount]} onValueChange={([num]) => setAmount(num)} step={1} max={400} />
        </div>
      </CardContent>
      <div className="flex items-center px-4 flex-col">
        <Button variant={side} type="submit" className={'flex-col h-auto w-full'}>
          {pending ? (
            <LoaderIcon size={20} />
          ) : (
            <>
              <strong className="font-semibold">
                {startCase(tradeType)} {startCase(side)}
              </strong>
              {tradeType === 'bet' ? (
                <span className="text-xs">To win ${amount * 2}</span>
              ) : (
                <span className="text-xs">To earn ${amount * 2}</span>
              )}
            </>
          )}
        </Button>

        <button
          className="text-primary font-semibold text-sm underline-offset-4 hover:underline px-4 py-1 rounded-md transition-colors flex flex-col justify-center items-center h-auto"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </form>
  );
}
