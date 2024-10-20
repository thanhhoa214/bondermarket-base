'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { MarketDetail, Stages } from '@/lib/web3/market';
import Link from 'next/link';
import { HTMLAttributes, useState } from 'react';
import MarketCardStage from './MarketCardStage';
import { useTotalMinted } from '@/hooks/web3/useTotalMinted';
import {formatNumber} from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSide } from '@/hooks/useSide';
import { useTradeType } from '@/hooks/useTradeType';
import MarketCardPurchase from './MarketCardPurchase';
import MarketCardContent from './MarketCardContent';

export default function MarketCard({
  marketDetail: { market, metadata },
  ...cardProps
}: HTMLAttributes<HTMLDivElement> & {
  marketDetail: MarketDetail;
}) {
  const { betId, phase, yesToken, noToken } = market;
  const title = metadata.title || 'Untitled Market';

  const { totalMinted: yesTotalMinted } = useTotalMinted(yesToken);
  const { totalMinted: noTotalMinted } = useTotalMinted(noToken);
  const totalDeposited = ((yesTotalMinted || 0) + (noTotalMinted || 0));
  
  console.log(yesTotalMinted, noTotalMinted, totalDeposited);
  const yesPercentage = (Number(yesTotalMinted) / Number(totalDeposited)) * 100 || 0;
  const noPercentage = (Number(noTotalMinted) / Number(totalDeposited)) * 100 || 0;
  
  const [side, setSide] = useSide();
  const [tradeType, setTradeType] = useTradeType();




  return (
    
    <Card 
    {...cardProps}
    className="flex flex-col overflow-hidden border-2 mt-[0.5rem] min-w-[340px] bg-gradient-to-r from-zinc-800/10 to-zinc-600/10">
        {/* Div 1: Image, Title, and Bets */}
        <div className="relative shadow-sm overflow-hidden">
          <div className="py-2 px-4 h-[80px] flex justify-between overflow-hidden gap-2 items-center">
            <div className="w-[40px] h-[40px] relative rounded-sm overflow-hidden">
              <Image className="object-cover" src={metadata.image} alt="" width={40} height={40} />
            </div>
            
            {/* If Bet - Will. Else - Did. Claim - Trump did win? */}
            <CardTitle className="border-b text-sm font-semibold">
              <p className="transition-all w-[240px] duration-300 ease-in-out text-left p-2">
                {title}
              </p>
            </CardTitle>

            {/* Bet amount */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">${formatNumber(totalDeposited * 10**12, 0)}</div>
              <div className="text-[10px]">Bet</div>
            </div>
          </div>
        </div>

        {/* Div 2: MarketCardContent */}
        <div className="overflow-auto min-h-[160px]">
          <MarketCardContent
          betId={betId}
          yesPercentage={yesPercentage}
          noPercentage={noPercentage}
          yesTotalMinted  ={yesTotalMinted || 0}
          noTotalMinted={noTotalMinted || 0}
          phase={phase}
          />
        </div>
        
        {/* Div 3: Grey text beneath */}
        <div className="bottom-0 text-sm border-t flex items-center justify-between py-2 px-4">
          <div className="flex items-center text-xs flex-row gap-2">
            <span className={`text-highlight`}>Bet</span>{">"}
            <span className={`'text-muted-foreground'}`}>Validate</span>{">"}
            <span className={`'text-muted-foreground'}`}>Dispute</span>{">"}
            <span className={`'text-muted-foreground'}`}>Claim</span>
            
          </div>
          {/* <div className="text-xs">
            {data.cutoffTime ? (
              new Date(data.cutoffTime).getTime() - Date.now() > 3600000 ? (
                format(data.cutoffTime, 'PPp')
              ) : (
                <CountdownTimer targetDate={data.cutoffTime} />
              )
            ) : (
              'Not set'
            )}
          </div> */}
          <div className="text-xs">
            {/* TODO: To add and fix the cutoff time */}
          {/* {expiry_time ? format(expiry_time, 'PP') : 'Not set'} */}
            {/* {data.cutoffTime ? format(data.cutoffTime, 'PPp') : 'Not set'} */}
            {/* {data.cutoffTime ? (
              new Date(data.cutoffTime).getTime() - Date.now() > 3600000 ? (
                format(data.cutoffTime, 'PPp')
              ) : (
                <CountdownTimer targetDate={data.cutoffTime} />
              )
            ) : (
              'Not set'
            )} */}

          </div>        
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
