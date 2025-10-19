import { CartesianGrid, Line, LineChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart"

import {
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card"

export const description = "A line chart"

const chartData = [
    { month: "January", desktop: 0 },
    { month: "February", desktop: 100 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLineDefault({balance}: {balance?: number}) {
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
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
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
                            dataKey="desktop"
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
                <p className="text-xs text-gray">April 1, 2025</p>
                <p className="text-xs text-gray">April 30, 2025</p>
            </div>
        </div>
    )
}
