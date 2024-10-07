import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Button } from '../ui/button';

export default function HowItWork({
  children,
  title = 'How it works',
  content = '',
  className,
}: PropsWithChildren<{ title?: React.ReactNode; content: React.ReactNode; className?: string }>) {
  return (
    <div className={cn('w-full flex justify-between items-start gap-2', className)}>
      {children}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Tooltip>
              <TooltipTrigger asChild>
                <Info />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {title && <DialogTitle className="text-2xl">{title}</DialogTitle>}
            {content}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
