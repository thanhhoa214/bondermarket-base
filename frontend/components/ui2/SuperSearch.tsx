'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { MarketDetail } from '@/lib/web3/market';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebounceValue, useEventListener } from 'usehooks-ts';
import { Input } from '../ui/input';

export default function SuperSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useDebounceValue('', 500);
  const router = useRouter();
  const marketsQuery = useQuery<MarketDetail[]>({ queryKey: ['markets', query] });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen((open) => !open);
    }
  };
  useEventListener('keydown', onKeyDown);

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search markets..." className="pl-8" onFocus={() => setOpen(true)} />

        <kbd className="absolute right-2.5 top-2.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find your interested markets..." onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
          </CommandGroup> */}
          <CommandGroup heading="Results">
            {marketsQuery.data?.map((marketDetail) => (
              <CommandItem
                key={marketDetail.market.betId.toString()}
                className="gap-2"
                onSelect={() => router.push(`/market/${marketDetail.market.betId}`)}
              >
                <Avatar>
                  {/* <AvatarImage src={market.image_url} /> */}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-grow">
                  <strong>{marketDetail.metadata.title}</strong>
                  <p className="text-muted-foreground line-clamp-1">{marketDetail.metadata.context}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
