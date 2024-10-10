'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn, today } from '@/lib/utils';
import { useWriteBonderV1YesNoFactoryCreateBet } from '@/lib/web3/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { parseUnits } from 'viem';
import { generateMarketDetail } from '../actions/ai/generateMarketDetail';
import { createMarket } from '../actions/market.actions';
import { ACCEPTED_IMAGE_TYPES, createMarketSchema, CreateMarketSchema } from './util';

export default function CreateMarketForm({ className, ...props }: HTMLAttributes<HTMLFormElement>) {
  const form = useForm<CreateMarketSchema>({
    resolver: zodResolver(createMarketSchema),
    defaultValues: {
      title: '',
      context: '',
      bondingTime: new Date(),
      creatorFee: 5,
    },
  });
  const { writeContract, data, isPending, isSuccess, error } = useWriteBonderV1YesNoFactoryCreateBet();
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    form.reset();
    toast.success(`Market created with tx ${data}`);
  }, [isSuccess, form, data]);

  useEffect(() => {
    if (error) toast.error(`Error: ${error.message}`);
  }, [error]);

  const onSubmit = async (values: CreateMarketSchema) => {
    if (isGenerating || isLoading || isPending) return;
    const { title, context, bondingTime, creatorFee, image } = values;
    setIsLoading(true);
    const imageAsBase64 =
      image &&
      (await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(values.image[0]);
      }));
    const ipfsCid = await createMarket({
      title,
      context,
      image: imageAsBase64,
    });
    writeContract({ args: [ipfsCid, BigInt(bondingTime.getTime()), parseUnits(creatorFee.toString(), 18)] });
    setIsLoading(false);
  };

  const generateMarket = async () => {
    if (isGenerating || isLoading || isPending) return;
    setIsGenerating(true);
    const values = form.getValues();
    const { title, context } = values;
    const improvedValues = await generateMarketDetail({ title, context });
    setIsGenerating(false);
    if (!improvedValues) return;
    form.setValue('title', improvedValues.title);
    form.setValue('context', improvedValues.context);
  };

  return (
    <Form {...form}>
      <form {...props} onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-5 max-w-2xl mx-auto', className)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Will Trump be the next President?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Context</FormLabel>
              <FormControl>
                <Textarea placeholder="Donald Trump wins the 2024 US Presidential Election." {...field} />
              </FormControl>
              <FormDescription className="flex justify-between items-end">
                We will automatically prefix every new lines with numbered.
                <Button
                  type="button"
                  variant={'secondary'}
                  size={'sm'}
                  disabled={!form.watch('title') || isLoading || isPending || isGenerating}
                  onClick={generateMarket}
                  className="text-xs h-auto py-1 px-2"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : '✨ Improve using AI'}
                </Button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bondingTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'dd/MM/yyyy HH:mm zzz') : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                  <div className="p-2 text-center flex flex-col">
                    <label htmlFor="time" className="text-muted-foreground text-xs mb-2">
                      Time based on your timezone ({format(today, 'zzz')})
                    </label>
                    <label
                      htmlFor="time"
                      className="flex justify-center items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <input
                        id="time"
                        type="time"
                        placeholder="00:00"
                        value={format(field.value, 'HH:mm')}
                        onChange={(e) => {
                          const time = e.target.value;
                          const date = format(field.value, 'yyyy-MM-dd');
                          field.onChange(new Date(`${date}T${time}`));
                        }}
                        className="bg-transparent text-xl font-bold focus-within:outline-none"
                      />
                    </label>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image for the market</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creatorFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Creator fee <small>(%)</small>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} min={0} max={100} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <footer className="flex justify-end gap-2">
          <Button type="submit" disabled={isLoading || isPending}>
            {isLoading || isPending ? <Loader2 className="animate-spin" /> : 'Create market'}
          </Button>
        </footer>
      </form>
    </Form>
  );
}
