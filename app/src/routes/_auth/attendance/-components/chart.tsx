import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    present: {
        label: "Present",
        color: "hsl(var(--chart-5))",
    },
    oaa: {
        label: "OAA",
        color: "hsl(var(--chart-3))",
    },
    absent: {
        label: "Absent",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function Chart(props: { oaa: number; present: number; absent: number }) {
    const chartData = [{ present: props.present, absent: props.absent, oaa: props.oaa }]
    const perecentage = (
        ((props.present + props.oaa) / (props.present + props.oaa + props.absent)) *
        100
    ).toFixed(3)

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-0">
                <CardTitle className="text-xl font-semibold decoration-1">Attendance</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={360}
                        innerRadius={90}
                        outerRadius={130}
                    >
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 8}
                                                    className={cn(
                                                        "fill-foreground text-3xl font-bold",
                                                        Number(perecentage) >= 90 &&
                                                            "fill-emerald-500",
                                                    )}
                                                >
                                                    {perecentage}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 28}
                                                    className="fill-muted-foreground text-lg"
                                                >
                                                    %
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="present"
                            stackId="a"
                            cornerRadius={0}
                            fill="var(--color-present)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="oaa"
                            stackId="a"
                            cornerRadius={0}
                            fill="var(--color-oaa)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="absent"
                            fill="var(--color-absent)"
                            stackId="a"
                            cornerRadius={0}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm text-xs">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="aspect-square h-4 w-4 rounded-full"
                            style={{ backgroundColor: chartConfig.present.color }}
                        />
                        <span>Present ~ {props.present}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: chartConfig.oaa.color }}
                        />
                        <span>OAA ~ {props.oaa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: chartConfig.absent.color }}
                        />
                        <span>Absent ~ {props.absent}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export { Chart }
