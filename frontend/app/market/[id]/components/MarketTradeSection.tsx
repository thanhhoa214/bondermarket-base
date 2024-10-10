'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoaderIcon from '@/components/ui2/LoaderIcon';
import TxLink from '@/components/ui2/TxLink';
import { useMyErc20Amount } from '@/hooks/web3/useMyErc20Amount';
import { useMyUsdcAmount } from '@/hooks/web3/useMyUsdcAmount';
import { useRetryTrade } from '@/hooks/web3/useRetryTrade';
import { moneyFormatter } from '@/lib/utils';
import { round, upperCase } from 'lodash-es';
import startCase from 'lodash-es/startCase';
import { CircleHelp, RotateCw, Settings } from 'lucide-react';
import { HtmlHTMLAttributes, useState } from 'react';
import { toast } from 'sonner';
import { useMarket } from '../MarketProvider';

const tabs = ['buy', 'sell'];

export default function MarketTradeSection(props: HtmlHTMLAttributes<HTMLDivElement>) {
  const marketDetail = useMarket();
  const { data: usdcAmount = 0, isLoading: isLoadingUsdc } = useMyUsdcAmount();
  const {
    side = 'yes',
    setSide,
    amount,
    setAmount,
    handleBuy,
    pending,
  } = useRetryTrade({ marketId: marketDetail.market?.betId });
  const sideAsText = startCase(side);
  const [tab, setTab] = useState(tabs[0]);
  const isBuy = tab === tabs[0];

  const { data: yesBalance } = useMyErc20Amount(marketDetail.market?.yesToken);
  const { data: noBalance } = useMyErc20Amount(marketDetail.market?.noToken);
  const holdAmount = { yes: Number(yesBalance) || 0, no: Number(noBalance) || 0 };

  const maxAmount = isBuy ? usdcAmount : holdAmount[side];

  if (!marketDetail) return null;

  async function handleTrade() {
    const result = await handleBuy();
    if (typeof result === 'object') {
      toast.success(
        <p>
          You&apos;ve successfully bought <strong>{amount}</strong> shares of <strong>{sideAsText}</strong>. Your
          transaction detail is
          <TxLink hash={result.betHash} className="ml-2" />
        </p>,
      );
    }
  }

  return (
    <Card {...props}>
      <CardContent className="pb-4">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl inline-flex items-center gap-1">
              Market
              <CircleHelp size={20} />
            </h3>
            <TabsList>
              {tabs.map((t) => (
                <TabsTrigger key={t} value={t} className="min-w-16">
                  {startCase(t)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value={tab}>
            <div className="flex items-center gap-1">
              <h4 className="font-semibold">Outcome</h4>

              <Button variant={'ghost'} size={'iconSm'} className="ml-auto ">
                <RotateCw size={16} />
              </Button>
              <Button variant={'ghost'} size={'iconSm'}>
                <Settings size={16} />
              </Button>
            </div>
            <div className="flex gap-2 mt-2 *:flex-grow *:h-14">
              <Button variant={side === 'yes' ? 'yes' : 'outline'} onClick={() => setSide('yes')}>
                Yes
              </Button>
              <Button variant={side === 'no' ? 'no' : 'outline'} onClick={() => setSide('no')}>
                No
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <h4 className="font-semibold">Amount</h4>

              <strong className="ml-auto text-xs inline-flex items-center gap-1">
                {/* <Image src={'/tokens/usdc.svg'} alt="USDC" height={20} width={20} /> */}
                {isLoadingUsdc ? <LoaderIcon size={14} /> : moneyFormatter(maxAmount)}
              </strong>
              <Button variant={'outline'} size={'sm'} className="h-6 text-xs px-2" onClick={() => setAmount(maxAmount)}>
                Max
              </Button>
            </div>
            <Input
              className="text-center text-3xl font-bold h-12 mt-2"
              value={amount}
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            {/* TODO: Should execute the most profitable trade for user no matter market or pool. */}
            <Button
              variant={side ?? 'default'}
              className="mt-4 w-full font-semibold flex-col h-auto"
              onClick={handleTrade}
            >
              {pending ? (
                <LoaderIcon size={20} />
              ) : isBuy ? (
                <>
                  Buy {sideAsText} <span>to win $100</span>
                </>
              ) : (
                <>
                  Sell {amount} {upperCase(side)} <span>for {round(amount / 1.8, 2)} USDC</span>
                </>
              )}
            </Button>

            {isBuy && (
              <dl className="mt-4 grid grid-cols-2 text-muted-foreground text-sm">
                <dt>Avg price</dt>
                <dd className="text-right">1¢</dd>
                <dt>Shares</dt>
                <dd className="text-right"> 0</dd>
                <dt>Potential return</dt>
                <dd className="text-right">$8.05 (12.25%)</dd>
              </dl>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
