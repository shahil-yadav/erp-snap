import { auth } from "@/components/auth/services/auth"
import { NetworkInfo } from "@/components/network-info"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { erp } from "@/utils/erp"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import * as cheerio from "cheerio"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

export const Route = createFileRoute("/_auth/attendance")({
    component: Attendance,
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function Attendance() {
    const query = useSuspenseQuery(options())
    const {
        data: { oaa, present, absent, tableDetails },
        dataUpdatedAt,
        error,
        isError,
        isSuccess,
        isFetching,
        isPaused,
    } = query

    if (oaa === -1 || present === -1 || absent === -1)
        return <p>Problem occured in parsing the webpage</p>

    return (
        <main className="space-y-5">
            <NetworkInfo
                dataUpdatedAt={dataUpdatedAt}
                error={error}
                isError={isError}
                isLoading={isFetching}
                isSuccess={isSuccess}
                isPaused={isPaused}
            />
            <div className="space-y-8">
                {oaa + present + absent === 0 ? (
                    <p>The session is not started yet</p>
                ) : (
                    <Chart oaa={oaa} present={present} absent={absent} />
                )}
                <AbsentRecord record={tableDetails} />
            </div>
        </main>
    )
}

function AbsentRecord({
    record,
}: {
    record: {
        date: string
        absent: number[]
    }[]
}) {
    return (
        <div>
            <h2 className="text-right text-2xl font-semibold">Absent Records</h2>
            {record.map(({ date, absent }) => (
                <div className="space-y-2">
                    <p className="">{date}</p>
                    <ScrollArea className="whitespace-nowrap rounded-md">
                        <div className="flex w-max gap-2 pb-6">
                            {absent.map((period) => (
                                <div className="flex shrink-0 items-center justify-center rounded-md bg-rose-600 p-4 text-lg font-semibold text-white">
                                    Abs ~ {period}
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            ))}
        </div>
    )
}

function Chart(props: { oaa: number; present: number; absent: number }) {
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
            <CardFooter className="justify-between text-sm">
                <div className="flex gap-4 text-xs">
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
                {/* <CircleArrowOutUpLeft className="h-4 w-4 self-end" /> */}
            </CardFooter>
        </Card>
    )
}

function options() {
    return queryOptions({
        queryKey: ["attendance"],
        queryFn: async () => {
            const html = await erp.get(
                "https://erp.psit.ac.in/Student/MyAttendanceDetail",
                auth.username,
                auth.password,
            )
            const $ = cheerio.load(html.data)
            const scrape = $.extract({
                lectures:
                    "#content > div > div > div > div.panel-body > div:nth-child(2) > span > strong",
                oaa: "#content > div > div > div > div.panel-body > div:nth-child(4) > span > a > strong",
                oaaPlusAbsent:
                    "#content > div > div > div > div.panel-body > div:nth-child(3) > span > strong",

                tableDetails: [
                    {
                        selector: "#data-table > tbody > tr",
                        value: {
                            period: ["td"],
                        },
                    },
                ],
            })

            const formattedTableDetails = scrape.tableDetails.map((data) => {
                const date = data.period[1]
                const absent = data.period
                    .slice(2)
                    .map((entry, index) => ({
                        periodNumber: index + 1,
                        state: entry,
                    }))
                    .filter((entry) => {
                        return entry.state !== ""
                    })
                    .map((entry) => entry.periodNumber)
                return { date, absent }
            })

            const formattedData = {
                lectures: Number(scrape.lectures?.match(/[0-9]+/)?.at(0) ?? -1),
                oaa: Number(scrape.oaa?.match(/[0-9]+/)?.at(0) ?? -1),
                oaaPlusAbsent: Number(scrape.oaaPlusAbsent?.match(/[0-9]+/)?.at(0) ?? -1),
                tableDetails: formattedTableDetails,
            }

            return {
                oaa: formattedData.oaa,
                absent: formattedData.oaaPlusAbsent - formattedData.oaa,
                present: formattedData.lectures - formattedData.oaaPlusAbsent,
                tableDetails: formattedData.tableDetails,
            }
        },
    })
}
