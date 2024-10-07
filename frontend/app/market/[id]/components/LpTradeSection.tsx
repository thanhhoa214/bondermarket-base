'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoaderIcon from '@/components/ui2/LoaderIcon';
import TxLink from '@/components/ui2/TxLink';
import { Side } from '@/hooks/useSide';
import { useConnectFirst } from '@/hooks/web3/useConnectFirst';
import { useMyErc20Amount } from '@/hooks/web3/useMyUsdcAmount';
import { usePairReserves } from '@/hooks/web3/usePairReserves';
import { useRouterAddLiquidity } from '@/hooks/web3/useRouterAddLiquidity';
import { useRouterRemoveLiquidity } from '@/hooks/web3/useRouterRemoveLiquidity';
import { Market } from '@/lib/web3/market';
import { round, upperCase } from 'lodash-es';
import startCase from 'lodash-es/startCase';
import { BadgePoundSterling, BadgeSwissFranc, CircleHelp } from 'lucide-react';
import Image from 'next/image';
import { HtmlHTMLAttributes, useState } from 'react';
import { toast } from 'sonner';
import { useMarket } from '../MarketProvider';

const tabs = ['deposit', 'withdraw'];

export default function LpTradeSection(props: HtmlHTMLAttributes<HTMLDivElement>) {
  const { market } = useMarket();
  const [tab, setTab] = useState(tabs[0]);

  if (!market) return null;
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
            <DepositTabContent market={market} />
          </TabsContent>
          <TabsContent value="withdraw" className="py-4">
            <WithdrawTabContent market={market} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function DepositTabContent({ market: { yesToken, noToken, yesLp, noLp } }: { market: Market }) {
  const [side, setSide] = useState<Side>('yes');
  const [amount, setAmount] = useState(0);
  const [pending, setPending] = useState(false);

  const { data: yesBalance } = useMyErc20Amount(yesToken);
  const { data: noBalance } = useMyErc20Amount(noToken);
  const maxAmount = (side === 'yes' ? yesBalance : noBalance) ?? 0;
  const { ratio: yesRatio } = usePairReserves(yesLp);
  const { ratio: noRatio } = usePairReserves(noLp);
  const ratio = side === 'yes' ? yesRatio : noRatio;
  const usdcAmount = amount / ratio;
  const addLiquidity = useRouterAddLiquidity();

  const handleTrade = async () => {
    try {
      const address = side === 'yes' ? yesToken : noToken;
      if (!address) throw new Error('Invalid address');
      setPending(true);
      const betHash = await addLiquidity(address, amount, usdcAmount);
      toast.success(
        <p>
          You&apos;ve successfully deposited{' '}
          <strong>
            {amount}
            {side.toUpperCase()} with {round(usdcAmount, 3)}USDC
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
  };
  const connectFirst = useConnectFirst(handleTrade);

  return (
    <>
      <AmountInput
        label="Deposit amount"
        side={side}
        amount={amount}
        setAmount={setAmount}
        setSide={setSide}
        maxAmount={maxAmount}
      />
      <div className="relative mt-2">
        <Input disabled className="text-right text-xl font-bold h-12" value={usdcAmount} />
        <strong className="absolute left-4 bottom-2.5 text-lg pointer-events-none text-muted-foreground inline-flex items-center gap-1">
          <Image src={'/tokens/usdc.svg'} alt="USDC" height={24} width={24} className="opacity-80" />
          USDC
        </strong>
      </div>
      <Button variant={side ?? 'default'} className="mt-4 w-full font-semibold flex-col h-auto" onClick={connectFirst}>
        {pending ? (
          <LoaderIcon size={20} />
        ) : (
          <>
            Deposit {amount} {upperCase(side)} with {usdcAmount} USDC <span>to earn 12% APY</span>
          </>
        )}
      </Button>
    </>
  );
}

function WithdrawTabContent({ market: { yesToken, noToken, yesLp, noLp } }: { market: Market }) {
  const [side, setSide] = useState<Side>('yes');
  const [amount, setAmount] = useState(0);
  const [pending, setPending] = useState(false);
  const { ratio: yesRatio } = usePairReserves(yesToken);
  const { ratio: noRatio } = usePairReserves(noToken);
  const lpYes = useMyErc20Amount(yesLp);
  const lpNo = useMyErc20Amount(noLp);

  const yesTradeInfo = { balance: Number(lpYes.data ?? 0), ratio: yesRatio };
  const noTradeInfo = { balance: Number(lpNo.data ?? 0), ratio: noRatio };
  const tradeInfo = side === 'yes' ? yesTradeInfo : noTradeInfo;

  const maxAmount = tradeInfo.balance ?? 0;
  const receivedUsdcAmount = amount / tradeInfo.ratio;

  const removeLiquidity = useRouterRemoveLiquidity();
  const sideAsText = upperCase(side);

  const handleTrade = async () => {
    try {
      const address = side === 'yes' ? yesToken : noToken;
      console.log({ address, amount, receivedUsdcAmount });
      if (!address) throw new Error('Invalid address');
      setPending(true);
      const betHash = await removeLiquidity(address, amount, receivedUsdcAmount);
      toast.success(
        <p>
          You&apos;ve successfully withdrawn{' '}
          <strong>
            {amount}
            {side.toUpperCase()} with {round(receivedUsdcAmount, 3)}USDC
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
  };
  const connectFirst = useConnectFirst(handleTrade);

  return (
    <>
      <AmountInput
        label="Withdraw amount"
        side={side}
        amount={amount}
        setAmount={setAmount}
        setSide={setSide}
        maxAmount={maxAmount}
      />
      <div className="flex flex-col mt-2">
        <div className="flex justify-between">
          <strong>USDC:</strong>
          <span>{round(receivedUsdcAmount, 3)}</span>
        </div>
        <div className="flex justify-between">
          <strong>{sideAsText} Tokens:</strong>
          <span>{amount}</span>
        </div>
      </div>
      <Button variant={side ?? 'default'} className="mt-4 w-full font-semibold flex-col h-auto" onClick={connectFirst}>
        Withdraw {sideAsText} Token
      </Button>
    </>
  );
}

function AmountInput({
  side,
  amount,
  setAmount,
  setSide,
  maxAmount,
  label,
}: {
  side: Side;
  amount: number;
  setAmount: (amount: number) => void;
  setSide: (side: Side) => void;
  maxAmount: number;
  label: string;
}) {
  return (
    <>
      <div className="flex items-center gap-1">
        <h4 className="font-semibold">{label}</h4>
        <strong className="ml-auto text-xs">{round(maxAmount, 3)} </strong>
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
    </>
  );
}
