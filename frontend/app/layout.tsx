import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/ui2/Navbar';
import { cn } from '@/lib/utils';
import '@coinbase/onchainkit/styles.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import './globals.css';
import Providers from './Providers';

const headlineFont = localFont({
  variable: '--font-headline',
  src: '../public/fonts/AvenueMono.ttf',
});

const fontSans = localFont({
  variable: '--font-sans',
  src: [
    { path: '../public/fonts/Roobert/Roobert-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Roobert/Roobert-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Roobert/Roobert-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Roobert/Roobert-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Roobert/Roobert-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Roobert/Roobert-Heavy.ttf', weight: '800', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bonder.market'),
  title: 'BonderMarket',
  description: 'Create your market | Bet on markets | Provide liquidity | Bond to bets',
  icons: ['/logo.png'],
  authors: [
    { name: 'agileape', url: 'https://x.com/agile_ape' },
    { name: 'thanhhoa214', url: 'https://github.com/thanhhoa214' },
  ],
  category: 'Finance',
  classification: 'betting, prediction, market, finance',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable, headlineFont.variable)}>
        <Providers>
          <Navbar />
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                error: 'bg-red-400 border-red-500',
                success: 'bg-green-600 border-green-700',
                warning: 'bg-yellow-300 border-yellow-500',
                info: 'bg-blue-300 border-blue-500',
              },
            }}
          />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
