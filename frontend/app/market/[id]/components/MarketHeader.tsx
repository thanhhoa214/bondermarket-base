'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatBigInt } from '@/lib/web3/erc20';
import { Stages } from '@/lib/web3/market';
import { format } from 'date-fns';
import { CircleHelp, Clock, Code, Link, Maximize, Star } from 'lucide-react';
import { useMarket } from '../MarketProvider';
import MarketChart from './MarketChart';

export default function MarketHeader() {
  const marketDetail = useMarket();
  const stages = [
    { stage: 'Bet', description: 'Everyone bets and trades YES/NO tokens.' },
    {
      stage: 'Validate',
      description:
        'Bonders votes for the bet result. If an outcome doesn\'t dominate more 75% of the population, the market will be moved to "Dispute" stage.',
    },
    { stage: 'Dispute', description: 'Bonders' },
    { stage: 'Claim', description: 'Winners & win-bonders can claim their rewards.' },
  ];
  if (!marketDetail) return null;
  const { market, metadata } = marketDetail;

  return (
    <>
      <header className="flex gap-4 items-center mb-4">
        <Avatar>
          <AvatarImage src={metadata.image} />
          <AvatarFallback>{market.betId}</AvatarFallback>
        </Avatar>

        <div className="w-full">
          <div className="flex items-center w-full text-muted-foreground text-xs md:text-sm">
            <span>${formatBigInt(market.totalDeposited)} Bet</span>
            <Clock size={16} className="ml-2 md:ml-4 mr-1" />
            <span>{format(Number(market.cutoffTime), 'MMM dd, yyyy')}</span>
            <Badge className="ml-2 md:ml-4">
              {Stages[market.phase]} stage
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp size={16} className="ml-1" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm text-xs text-muted-foreground font-normal pb-3">
                  <p className="mb-2">A bonder market will go through 4 stages:</p>
                  <ol className="list-decimal list-inside">
                    {stages.map((stage) => (
                      <li key={stage.stage}>
                        <strong className="text-foreground">{stage.stage}:</strong> <span>{stage.description}</span>
                      </li>
                    ))}
                  </ol>
                </TooltipContent>
              </Tooltip>
            </Badge>
            <ul className="flex ml-auto self-start">
              <li>
                <Button variant={'ghost'} size={'iconSm'}>
                  <Star size={16} />
                </Button>
              </li>
              <li>
                <Button variant={'ghost'} size={'iconSm'}>
                  <Code size={16} />
                </Button>
              </li>
              <li>
                <Button variant={'ghost'} size={'iconSm'}>
                  <Link size={16} />
                </Button>
              </li>
              <li>
                <Button variant={'ghost'} size={'iconSm'}>
                  <Maximize size={16} />
                </Button>
              </li>
            </ul>
          </div>
          <h2 className="text-lg font-semibold mt-1 md:mt-0">{metadata.title}</h2>
        </div>
      </header>

      <MarketChart />
    </>
  );
}
