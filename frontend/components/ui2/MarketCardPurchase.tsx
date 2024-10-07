'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Side } from '@/hooks/useSide';
import { TradeType } from '@/hooks/useTradeType';
import { cn } from '@/lib/utils';
import { Stages } from '@/lib/web3/market';
import { zodResolver } from '@hookform/resolvers/zod';
import { startCase } from 'lodash-es';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CardContent } from '../ui/card';
import { Slider } from '../ui/slider';

const formSchema = z.object({ amount: z.number() });

// TODO: Need to link to write buttons

export default function MarketCardPurchase({
  onBack,
  side,
  tradeType,
  ...props
}: {
  stage: Stages;
  side: Side;
  tradeType?: TradeType;
  onBack: VoidFunction;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 1 },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-2')}>
        <CardContent>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <div className="flex gap-2">
                <div className="relative">
                  <Input placeholder="Amount" max={400} {...field} className="w-32 font-semibold text-xl pr-8" />
                  <Button
                    variant={'outline'}
                    type="button"
                    className="absolute top-2 right-2 h-6 py-1 px-1.5 rounded-sm text-xs text-muted-foreground bg-foreground/5"
                    onClick={() => field.onChange(Math.min(field.value + 10, 400))}
                  >
                    +10
                  </Button>
                </div>
                <Slider value={[field.value]} onValueChange={([num]) => field.onChange(num)} step={1} max={400} />
              </div>
            )}
          />
        </CardContent>
        <div className="flex items-center px-4 flex-col">
          <Button variant={side} type="submit" className={'flex-col h-auto w-full'}>
            <strong className="font-semibold">
              {startCase(tradeType)} {startCase(side)}
            </strong>
            {tradeType === 'bet' ? (
              <span className="text-xs">To win ${form.watch('amount') * 2}</span>
            ) : (
              <span className="text-xs">To earn ${form.watch('amount') * 2}</span>
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
    </Form>
  );
}
