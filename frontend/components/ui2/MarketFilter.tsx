'use client';

import React from 'react';
import Link from 'next/link';

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
    <div className="w-full">
      <div className="flex gap-4 justify-center pb-6">
        {categories.map((category, index) => (
          <Link key={index} href={category.link} className="block">
            <div className="relative bg-card border-[0.5px] text-card-foreground h-[100px] w-[200px] p-4 rounded-xl overflow-hidden">
              <div className="mb-2">{category.icon}</div>
              <p className="text-lg">{category.title}</p>
              <p className="text-sm text-gray-600">{category.count} Markets</p>
            </div>
          </Link>
        ))}
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
    </div>
  );
}
