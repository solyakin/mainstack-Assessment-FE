import { CartesianGrid, Line, LineChart } from "recharts"
import { 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent, 
    type ChartConfig 
} from "../ui/chart"
import {
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { 
    formatDateForDisplay, 
    getChatRecords, 
    getDateRange 
} from "../../lib/utils"
import type { TransactionType } from "../../constant/global";

export const description = "A line chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineDefault(
    {balance, transactions}: {balance?: number, transactions: TransactionType[]}
) {
    const chartData = getChatRecords(transactions);
    const { minDate, maxDate } = getDateRange(chartData);

    return (
        <div className="">
            <CardHeader>
                <div className="flex items-center gap-20 mb-10">
                    <div>
                        <span className="text-sm font-[DegularMedium] text-gray">Available Balance</span>
                        <CardTitle>
                            <span className="mt-2 text-4xl !leading-[48px] trackling-[-1.5px] text-dark font-[DegularBold]">USD {balance?.toLocaleString()}</span>
                        </CardTitle>
                    </div>
                    <button
                        className={`px-10 py-2 rounded-full !leading-[24px] tracking-[-0.4px] font-siemiboldransition-all duration-200 cursor-pointer bg-black text-white shadow-sm`}
                    >
                        Withdraw
                    </button>
                </div>            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="amount"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <div className="flex items-center w-full px-7">
            <div className="rounded-full h-1 w-1 bg-gray"></div>
            <div className="w-full h-[1px] bg-gray border-0"></div>
            <div className="rounded-full h-1 w-1 bg-gray"></div>
            </div>
            <div className="flex items-center justify-between px-7">
                <p className="text-xs text-gray">{formatDateForDisplay(minDate)}</p>
                <p className="text-xs text-gray">{formatDateForDisplay(maxDate)}</p>
            </div>
        </div>
    )
}
