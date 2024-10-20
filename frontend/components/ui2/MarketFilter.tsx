'use client';

import Link from 'next/link';
import React from 'react';

interface MarketCategory {
  title: string;
  count: number;
  link: string;
  icon: React.ReactNode;
}

interface MarketFilterProps {
  categories: MarketCategory[];
  totalMarkets: string;
  totalBet: string;
  totalCategories: string;
}

export default function MarketFilter({ categories, totalMarkets, totalBet, totalCategories }: MarketFilterProps) {
  return (
    <section>
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-4 justify-center pb-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="block">
              <div className="relative bg-card border-[0.5px] text-card-foreground w-[200px] aspect-[2] p-4 rounded-xl overflow-hidden">
                <p className="mb-2">{category.icon}</p>
                <p className="text-lg">{category.title}</p>
                <p className="text-sm text-gray-600">{category.count} Markets</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-6 justify-center">
        <p>
          Total Markets <span className="text-green-500">{totalMarkets}</span>
        </p>
        <p>
          Total Wagered <span className="text-green-500">{totalBet}</span>
        </p>
        <p>
          Total Categories <span className="text-green-500">{totalCategories}</span>
        </p>
      </div>
    </section>
  );
}
