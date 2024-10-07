'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const featuredMarkets = [
  {
    title: 'Political Markets',
    description: 'Description for market 1',
    link: '/market/1',
    image: 'https://picsum.photos/200/300', // Unsplash image
    tags: ['Political', 'US Election'],
  },
  {
    title: 'Controversial Markets',
    description: 'Description for market 2',
    link: '/market/2',
    image: 'https://picsum.photos/200/300?test', // Unsplash image
    tags: ['Tag3', 'Tag4'],
  },
  {
    title: 'Trending Markets',
    description: 'Description for market 3',
    link: '/market/3',
    image: 'https://picsum.photos/200/300?testing', // Unsplash image
    tags: ['Tag5', 'Tag6'],
  },
];

export default function FeaturedMarkets() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
      {featuredMarkets.map((market, index) => (
        <Link key={index} href={market.link} className="block">
          <Card className="relative bg-card text-card-foreground h-[200px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 z-0 h-full w-full">
              <Image src={market.image} alt={market.title} layout="fill" objectFit="cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-background/90 z-10 to-background/40" />
            <div className="relative z-20 p-6 h-full flex flex-col justify-between">
              <CardContent>
                <CardTitle className="text-white text-2xl">{market.title}</CardTitle>
                <p className="text-white text-sm">{market.description}</p>
                <div className="flex gap-2 my-2">
                  {market.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-white/10 text-xs px-1 opacity-50 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <Link className="flex items-center ml-auto text-sm" href={market.link}>
                Trade Now <ArrowRight />
              </Link>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
