import { IMonthlySales } from '../../types/statistics.interface';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/components/ui';
import {
   type ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from '@/shared/components/ui/chart';
import { formatPrice } from '@/shared/lib/format-price';

const chartConfig = {
   value: {
      label: 'Прибыль',
      color: '#3B82F6',
   },
} satisfies ChartConfig;

interface OverviewProps {
   data: IMonthlySales[];
}

export function Overview({ data }: OverviewProps) {
   return (
      <Card>
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4">
            <CardTitle className="text-xl font-medium tracking-[0.1px] line-clamp-1">
               Прибыль
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ChartContainer
               className="aspect-auto h-77.5 w-full"
               config={chartConfig}
            >
               <AreaChart
                  accessibilityLayer
                  data={data}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                  />
                  <ChartTooltip
                     content={
                        <ChartTooltipContent
                           formatter={(value) => formatPrice(Number(value))}
                           labelFormatter={(label) =>
                              new Date(label).toLocaleDateString()
                           }
                           indicator="line"
                        />
                     }
                  />
                  <Area
                     dataKey="value"
                     type="natural"
                     fill="var(--color-value)"
                     stroke="var(--color-value)"
                  />
               </AreaChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
