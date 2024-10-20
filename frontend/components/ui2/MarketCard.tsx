'use client';
import { Card, CardTitle } from '@/components/ui/card';
import { useTotalMinted } from '@/hooks/web3/useTotalMinted';
import { formatNumber } from '@/lib/utils';
import { MarketDetail } from '@/lib/web3/market';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import MarketCardContent from './MarketCardContent';

export default function MarketCard({
  marketDetail: { market, metadata },
  ...cardProps
}: HTMLAttributes<HTMLDivElement> & {
  marketDetail: MarketDetail;
}) {
  const { betId, phase, yesToken, noToken } = market;
  const title = metadata.title || 'Untitled Market';

  const { data: yesTotalMinted = 0 } = useTotalMinted(yesToken);
  const { data: noTotalMinted = 0 } = useTotalMinted(noToken);
  const totalDeposited = yesTotalMinted + noTotalMinted;

  const yesPercentage = (Number(yesTotalMinted) / Number(totalDeposited)) * 100 || 0;
  const noPercentage = (Number(noTotalMinted) / Number(totalDeposited)) * 100 || 0;

  return (
    <Card
      {...cardProps}
      className="flex flex-col overflow-hidden border-2 mt-[0.5rem] min-w-[340px] bg-gradient-to-r from-zinc-800/10 to-zinc-600/10"
    >
      {/* Div 1: Image, Title, and Bets */}
      <header className="py-2 pl-3 pr-4 h-16 flex justify-between overflow-hidden gap-2 items-center border-b">
        <div className="shrink-0 w-10 aspect-square relative rounded-sm overflow-hidden">
          <Image className="object-cover" fill src={metadata.image} alt={metadata.title} />
        </div>

        {/* If Bet - Will. Else - Did. Claim - Trump did win? */}
        <CardTitle className="text-sm font-semibold w-60 line-clamp-2">{title}</CardTitle>

        {/* Bet amount */}
        <div className="shrink-0 text-center">
          <p className="text-xs">${formatNumber(totalDeposited, 0)}</p>
          <p className="text-[10px]">Bet</p>
        </div>
      </header>

      {/* Div 2: MarketCardContent */}
      <div className="overflow-auto min-h-[160px]">
        <MarketCardContent
          betId={betId}
          yesPercentage={yesPercentage}
          noPercentage={noPercentage}
          yesTotalMinted={yesTotalMinted || 0}
          noTotalMinted={noTotalMinted || 0}
          phase={phase}
        />
      </div>

      {/* Div 3: Grey text beneath */}
      <div className="bottom-0 text-sm border-t flex items-center justify-between py-2 px-4">
        <div className="flex items-center text-xs flex-row gap-2">
          <span className={`text-highlight`}>Bet</span>
          {'>'}
          <span className={`'text-muted-foreground'}`}>Validate</span>
          {'>'}
          <span className={`'text-muted-foreground'}`}>Dispute</span>
          {'>'}
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
