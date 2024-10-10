'use client';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { usePastEvents } from '@/hooks/web3/usePastEvents';
import { erc20EventToTransferData } from '@/lib/web3/erc20';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useMarket } from '../MarketProvider';

const chartConfig = {
  transfers: { label: 'Yes propability', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

export default function MarketChart() {
  const marketDetail = useMarket();
  const yesEvents = usePastEvents(marketDetail.market?.yesToken);
  const noEvents = usePastEvents(marketDetail.market?.noToken);

  const sortedEvents = yesEvents
    .map((e) => ({ data: erc20EventToTransferData(e), type: 'yes' }))
    .concat(noEvents.map((e) => ({ data: erc20EventToTransferData(e), type: 'no' })))
    .sort((a, b) => a.data.timestamp - b.data.timestamp);

  const output: Array<{ timestamp: number; value: number }> = [];
  let accumulatedYes = 0;
  let accumulatedNo = 0;
  for (const event of sortedEvents) {
    if (event.type === 'yes') {
      accumulatedYes += event.data.value;
    } else {
      accumulatedNo += event.data.value;
    }
    output.push({
      timestamp: event.data.timestamp,
      value: parseFloat(((accumulatedYes / (accumulatedYes + accumulatedNo)) * 100).toFixed(2)),
    });
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-[3]">
      <AreaChart accessibilityLayer data={output}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="transfers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-transfers)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-transfers)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="value"
          type="natural"
          fill="url(#transfers)"
          fillOpacity={0.4}
          stroke="var(--color-transfers)"
          stackId="a"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fill="var(--color-transfers)"
          fontWeight="600"
          letterSpacing={2}
          fontFamily='"Inter", sans-serif'
        >
          {output.length > 0 ? `${output[output.length - 1].value}% Yes` : 'No Data'}
        </text>
      </AreaChart>
    </ChartContainer>
  );
}
