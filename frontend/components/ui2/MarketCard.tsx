'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Market, Stages } from '@/lib/web3/market';
import Link from 'next/link';
import { HTMLAttributes, useState } from 'react';
import MarketCardStage from './MarketCardStage';

type TimeLeftType = {
  days: number;
  hours: number;
};

const formatTime = (date: Date): TimeLeftType => {
  const timeInSeconds = date.getTime() / 1000 - Date.now() / 1000;
  const days = Math.floor(timeInSeconds / 86400);
  const hours = Math.floor((timeInSeconds - days * 86400) / 3600);
  return { days, hours };
};

export default function MarketCard({
  market,
  ...cardProps
}: HTMLAttributes<HTMLDivElement> & {
  market: Market;
}) {
  const { id, stage, metadata, expiryTime, disputed } = market;
  const title = metadata.title || 'Untitled Market';
  // const { days, hours } = formatTime(expiry_time);

  // // process the retrieved variables
  // const totalBetSupply = yes_token_supply + no_token_supply;
  // const yesPercentage = (Number(yes_token_supply) / Number(totalBetSupply)) * 100;
  // const totalBondSupply = yes_bonds + no_bonds;
  // const bondPercentage = (Number(yes_bonds) / Number(no_bonds)) * 100;

  // const poolFee = %;
  // const feeToPool = poolFee * total_deposited;
  // TODO: need to get this variable - not on our db - call from contract?
  const feeToPool = 10000;

  // const betData = {
  //   type: 'bet',
  //   yes: 8000, // TODO: yes_token_supply
  //   no: 2000, // TODO: no_token_supply
  //   likelihood: 80, // TODO: yesPercentage
  //   result: 1, // TODO: result
  //   total: totalBetSupply,
  // };

  // const bondData = {
  //   type: 'bond',
  //   yes: 60,
  //   no: 30,
  //   likelihood: bondPercentage,
  //   total: totalBondSupply,
  //   fee: feeToPool,
  //   disputed: disputed,
  // };

  const [isFront, setIsFront] = useState(stage !== Stages.Validate && stage !== Stages.Dispute);

  return (
    <Card {...cardProps} className="flex flex-col p-2 md:aspect-[5/4] relative">
      {/* Div 1: Image, Title, and Stage */}
      <div className="flex justify-between space-x-2 items-center">
        <Link
          className="flex flex-row items-center p-1 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
          href={'/market/' + id}
        >
          <Avatar className="mr-2">
            <AvatarImage src={metadata.image} />
            <AvatarFallback>{id}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-[12px] line-clamp-2 font-normal">
              {/* TODO: To ensure title length falls under our stated range */}
              {isFront ? (
                <>
                  <span className="text-primary">Will {title}</span>
                  {title.slice(5)}
                </>
              ) : (
                <>
                  <span className="text-purple-400">Did </span>
                  {title.startsWith('Will') ? title.slice(5) : title}
                </>
              )}
            </CardTitle>
          </div>
        </Link>
        <MarketCardStage stage={stage} size={32} />
      </div>

      {/* Div 2: MarketCardContent */}

      {/* <div className="py-2">
        <MarketCardContent2 betData={betData} bondData={bondData} stage={stage} isFront={isFront} />
      </div> */}

      {/* Div 3: Grey text beneath */}
      {/* <div className="absolute text-sm text-gray-500 bottom-0 left-0 right-0 p-2 bg-background"> */}

      <div className="text-[12px]/[16px] flex justify-between items-center text-gray-500 absolute bottom-0 left-0 right-0 p-2">
        {/* <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col justify-center items-center">
            <div className="text-xs/[12px]">{moneyFormatter(betData.total)}</div>
            <div className="text-[10px]">Bet</div>
          </div>

          <div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-xs/[12px]">
                {moneyFormatter(bondData.fee)} <span className="text-[12px]">to</span>
              </div>
              <div className={` text-[10px] ${disputed ? 'text-amber-600' : 'text-gray-600'}`}>
                {disputed ? 'Bonders' : 'Bonder Pool'}
              </div>
            </div>
          </div>
        </div> */}

        {/* <CustomSwitch2 /> */}
        <Switch
          defaultChecked={isFront}
          checked={!isFront}
          onCheckedChange={() => setIsFront(!isFront)}
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary hover:scale-[1.1]"
        />
      </div>
    </Card>
  );

  // return (
  //   <Card {...cardProps}>
  //     <CardHeader className="flex-row items-center gap-2 space-y-0">
  //       <div className="flex flex-row gap-2">
  //         <Avatar>
  //           <AvatarImage src={image_url} />
  //           <AvatarFallback>{title}</AvatarFallback>
  //         </Avatar>

  //         <Link href={'/market/' + id}>
  //           <CardDescription className="text-xs">#{Number(id)}</CardDescription>
  //           <CardTitle className="text-sm sm:text-base line-clamp-2">{title}</CardTitle>
  //         </Link>
  //       </div>
  //       <div className="ml-auto !-mt-2 flex flex-col justify-center">
  //         <MarketCardStage stage={"Bet"} />
  //         <span className="text-[10px] text-center">
  //           {/* <Countdown date={expiry_time} renderer={({ days, hours }) => `${days}d:${hours}h`} /> */}
  //           {days}d:{hours}h
  //         </span>
  //       </div>
  //     </CardHeader>
  //     {/* <MarketCardContent market={market} /> */}
  //   </Card>
  // );
}
