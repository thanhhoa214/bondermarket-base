'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardProps, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { dateFormatter } from '@/lib/utils';
import { MarketDetail, Stages } from '@/lib/web3/market';
import { useQuery } from '@tanstack/react-query';
import { Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function CreatedBets({ serverMarkets, ...props }: CardProps & { serverMarkets: MarketDetail[] }) {
  const address = useAccount().address;
  const myMarketsQuery = useQuery({
    queryKey: ['myMarkets', address],
    initialData: serverMarkets.filter((market) => market.market.creatorId.toString() === address),
  });

  return (
    <Card {...props}>
      <CardHeader className="flex-row justify-between items-start">
        <div>
          <CardTitle>Your owned markets</CardTitle>
          <CardDescription>All markets you created</CardDescription>
        </div>
        <Link href={'/create'}>
          <Button size={'sm'} variant={'secondary'}>
            <Plus size={16} className="mr-1" /> Create
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pb-4">
        <ul>
          {myMarketsQuery.isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <li className="flex items-center py-2 px-2 -mx-2 gap-4 rounded-md hover:bg-foreground/5" key={index}>
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-40 h-4" />
                    <Skeleton className="w-20 h-3" />
                  </div>
                  <Skeleton className="w-20 h-6" />
                </li>
              ))
            : myMarketsQuery.data?.map(({ market, metadata }, index) => {
                return (
                  <div key={market.betId}>
                    {index > 0 && <hr />}
                    <li className="flex items-center py-2 px-2 -mx-2 gap-4 rounded-md hover:bg-foreground/5">
                      <Avatar>
                        <AvatarImage src={metadata.image} />
                        <AvatarFallback>{market.betId.toString()}</AvatarFallback>
                      </Avatar>
                      <div className="max-w-60 line-clamp-2">
                        <Link href={`/market/${market.betId}`} className="font-semibold ftext-sm">
                          {metadata.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          Expire at {dateFormatter(Number(market.cutoffTime))}
                        </p>
                      </div>
                      <p className="ml-auto flex items-center gap-1 text-sm">
                        <Badge variant={'outline'}>{Stages[market.phase]}</Badge>
                      </p>
                      <div className="flex items-center gap-1">
                        <Button size={'icon'} variant={'ghost'}>
                          <Edit size={16} />
                        </Button>
                      </div>
                    </li>
                  </div>
                );
              })}
        </ul>
      </CardContent>
    </Card>
  );
}
