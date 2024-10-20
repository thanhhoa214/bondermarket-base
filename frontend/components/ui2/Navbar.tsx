'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TelegramIcon from '../icons/telegram';
import XIcon from '../icons/x';
import { ConnectWalletButton } from './ConnectWalletButton';
import FaucetButton from './FaucetButton';
import LogoIcon from './LogoIcon';
import SuperSearch from './SuperSearch';

export const TWITTER_URL = 'https://x.com/bonderdotmarket';
export const TELEGRAM_URL = 'https://t.me/bonderdotmarket';

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Markets' },
    { href: '/create', label: 'Create' },
    // { href: '/portfolio', label: 'Portfolio' },
  ];

  const normalizePath = (path: string) => path.replace(/\/$/, '');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm border-b bg-background/95">
      <div className="v2-container flex justify-between items-center gap-6 py-2">
        <div className="flex">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold md:text-base text-white">
            <LogoIcon width={20} />
          </Link>
        </div>
        <SuperSearch />
        <div className="hidden md:flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
          <FaucetButton />
          <ConnectWalletButton />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden shrink-0">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] z-[60] md:hidden">
            <nav className="text-sm font-medium flex flex-col items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'mx-2 text-foreground/40 transition-colors px-1.5 py-1 rounded-md border border-transparent hover:text-foreground',
                    normalizePath(pathname) === normalizePath(link.href) && 'text-foreground border-b-2 border-white',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <br />
          </SheetContent>
        </Sheet>
      </div>
      <nav className="v2-container flex text-sm font-medium justify-between items-center border-t py-0">
        <div className="flex items-center gap-x-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-foreground/40 h-full transition-colors px-1.5 py-2.5 border-transparent hover:text-foreground',
                normalizePath(pathname) === normalizePath(link.href) && 'text-foreground border-b border-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <ul className="flex">
          <Link href={TWITTER_URL} target="_blank">
            <Button variant="link" className="px-2 text-foreground text-lg">
              <XIcon size={18} />
            </Button>
          </Link>
          <Link href={TELEGRAM_URL} target="_blank">
            <Button variant="link" className="px-2  text-foreground  text-lg">
              <TelegramIcon size={24} />
            </Button>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
