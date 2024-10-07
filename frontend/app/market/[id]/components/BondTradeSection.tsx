'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoaderIcon from '@/components/ui2/LoaderIcon';
import TxLink from '@/components/ui2/TxLink';
import { Side } from '@/hooks/useSide';
import { useMyErc20Amount } from '@/hooks/web3/useMyUsdcAmount';
import { usePairReserves } from '@/hooks/web3/usePairReserves';
import { useRouterAddLiquidity } from '@/hooks/web3/useRouterAddLiquidity';
import { round } from 'lodash-es';
import startCase from 'lodash-es/startCase';
import { BadgePoundSterling, BadgeSwissFranc, CircleHelp } from 'lucide-react';
import Image from 'next/image';
import { HtmlHTMLAttributes, useState } from 'react';
import { toast } from 'sonner';
import { Address } from 'viem';
import { useMarket } from '../MarketProvider';

const tabs = ['deposit', 'withdraw'];

export default function BondTradeSection(props: HtmlHTMLAttributes<HTMLDivElement>) {
  const { market } = useMarket();
  const [side, setSide] = useState<Side>('yes');
  const [amount, setAmount] = useState(0);
  const [pending, setPending] = useState(false);
  const [tab, setTab] = useState(tabs[0]);
  const { data: yesBalance } = useMyErc20Amount(market?.yesToken);
  const { data: noBalance } = useMyErc20Amount(market?.noToken);
  const maxAmount = side === 'yes' ? Number(yesBalance) : Number(noBalance);
  const sideAsText = startCase(side);
  const { ratio: yesRatio } = usePairReserves(market?.yesLp);
  const { ratio: noRatio } = usePairReserves(market?.noLp);
  const ratio = side === 'yes' ? yesRatio : noRatio;
  const usdcAmount = round(amount / ratio, 3);
  const yesAddLiquidity = useRouterAddLiquidity();

  async function handleTrade() {
    try {
      const address = side === 'yes' ? market?.yesToken : market?.noToken;
      if (!address) throw new Error('Invalid address');
      setPending(true);
      const betHash = await yesAddLiquidity(address as Address, amount, usdcAmount);
      const action = tab === 'deposit' ? 'deposited' : 'withdrawn';
      toast.success(
        <p>
          You&apos;ve successfully {action}{' '}
          <strong>
            {amount}
            {side.toUpperCase()} with {usdcAmount}USDC
          </strong>{' '}
          into the pool. You can find your transaction detail here
          <TxLink hash={betHash} className="ml-2" />
        </p>,
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card {...props}>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl inline-flex items-center gap-1">
              Pool
              <CircleHelp size={20} />
            </h3>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {startCase(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="deposit" className="py-4">
            <div className="flex items-center gap-1">
              <h4 className="font-semibold">{startCase(tab)} amount</h4>

              <strong className="ml-auto text-xs">{maxAmount} </strong>
              <Button variant={'outline'} size={'sm'} className="h-6 text-xs px-2" onClick={() => setAmount(maxAmount)}>
                Max
              </Button>
            </div>
            <div className="relative mt-2">
              <Select value={side} onValueChange={(e) => setSide(e as Side)}>
                <SelectTrigger className="absolute bottom-1 left-1 w-28 border-none">
                  <SelectValue placeholder="Theme" className="text-xl" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">
                    <BadgeSwissFranc className="inline-block mb-1 mr-1" />
                    <strong className="text-lg -mb-0.5">YES</strong>
                  </SelectItem>
                  <SelectItem value="no">
                    <BadgePoundSterling className="inline-block mb-1 mr-1" />
                    <strong className="text-lg -mb-0.5">NO</strong>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                className="text-right text-2xl font-bold h-12"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="relative mt-2">
              <Input disabled className="text-right text-xl font-bold h-12" value={usdcAmount} />
              <strong className="absolute left-4 bottom-2.5 text-lg pointer-events-none text-muted-foreground inline-flex items-center gap-1">
                <Image src={'/tokens/usdc.svg'} alt="USDC" height={24} width={24} className="opacity-80" />
                USDC
              </strong>
            </div>
            <Button
              variant={side ?? 'default'}
              className="mt-4 w-full font-semibold flex-col h-auto"
              onClick={handleTrade}
            >
              {pending ? (
                <LoaderIcon size={20} />
              ) : (
                <>
                  {startCase(tab)} {amount} {sideAsText} with {usdcAmount} USDC <span>to earn 12% APY</span>
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
