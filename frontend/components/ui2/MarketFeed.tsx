'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface Activity {
  user: string;
  action: 'buy' | 'sell';
  timestamp: Date;
  market: string;
}

interface MarketFeedProps {
  activities: Activity[];
}

export default function MarketFeed({ activities }: MarketFeedProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const content = contentRef.current;
    if (marquee && content) {
      const scrollmarquee = () => {
        if (marquee.scrollLeft >= content.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        } else {
          marquee.scrollLeft += 1;
        }
      };

      const intervalId = setInterval(scrollmarquee, 50);
      return () => clearInterval(intervalId);
    }
  }, [activities]);

  const renderActivity = (activity: Activity, index: number) => (
    <div key={index} className="flex-shrink-0 p-4 rounded-lg shadow-md flex items-center gap-2 mx-2">
      {activity.action === 'buy' ? (
        <ArrowUpRight className="text-green-500" style={{ width: '24px', height: '24px' }} />
      ) : (
        <ArrowDownRight className="text-red-500" style={{ width: '24px', height: '24px' }} />
      )}
      <div>
        <p className="text-sm text-foreground">
          {activity.user} {activity.action} from {activity.market}
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative -mx-8 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div
        ref={marqueeRef}
        className="flex items-center overflow-x-scroll scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div ref={contentRef} className="flex whitespace-nowrap">
          {activities.map(renderActivity)}
          {activities.map(renderActivity)}
        </div>
      </div>
    </div>
  );
}
