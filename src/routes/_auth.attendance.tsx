import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { CapacitorHttp } from "@capacitor/core"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import * as cheerio from "cheerio"
import { CircleArrowOutUpLeft } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

export const Route = createFileRoute("/_auth/attendance")({
   component: Attendance,
   loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function Attendance() {
   const query = useSuspenseQuery(options())
   const { oaa, present, absent } = query.data
   const lectures = oaa + present + absent

   if (lectures === 0) {
      return <p>The session is not started yet</p>
   }
   return <Chart oaa={oaa} present={present} absent={absent} />
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
   const perecentage = (((props.present + props.oaa) / (props.present + props.oaa + props.absent)) * 100).toFixed(3)

   return (
      <Card className="flex flex-col">
         <CardHeader className="pb-0">
            <CardTitle className="text-xl decoration-1 font-semibold">Attendance</CardTitle>
            <CardDescription></CardDescription>
         </CardHeader>
         <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-w-[250px] w-full">
               <RadialBarChart data={chartData} endAngle={360} innerRadius={90} outerRadius={130}>
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
                                          "text-3xl fill-foreground font-bold",
                                          Number(perecentage) >= 90 && "fill-emerald-500"
                                       )}
                                    >
                                       {perecentage}
                                    </tspan>
                                    <tspan
                                       x={viewBox.cx}
                                       y={(viewBox.cy || 0) + 28}
                                       className="text-lg fill-muted-foreground"
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
               <div className="flex gap-2 items-center">
                  <span>Present</span>{" "}
                  <div
                     className="w-4 h-4 rounded-full aspect-square"
                     style={{ backgroundColor: chartConfig.present.color }}
                  />
               </div>
               <div className="flex items-center gap-2">
                  <span>OAA</span>
                  <div className="w-4 rounded-full h-4" style={{ backgroundColor: chartConfig.oaa.color }} />
               </div>
               <div className="flex items-center gap-2">
                  <span>Absent</span>
                  <div className="w-4 rounded-full h-4" style={{ backgroundColor: chartConfig.absent.color }} />
               </div>
            </div>
            <CircleArrowOutUpLeft className="w-4 self-end h-4" />
         </CardFooter>
      </Card>
   )
}

function options() {
   return queryOptions({
      queryKey: ["attendance"],
      queryFn: async () => {
         const html = await CapacitorHttp.get({
            url: "https://erp.psit.ac.in/Student/MyAttendanceDetail",
         })

         const $ = cheerio.load(html.data)
         const scrape = $.extract({
            lectures: "#content > div > div > div > div.panel-body > div:nth-child(2) > span > strong",
            oaa: "#content > div > div > div > div.panel-body > div:nth-child(4) > span > a > strong",
            oaaPlusAttendance: "#content > div > div > div > div.panel-body > div:nth-child(3) > span > strong",
         })
         const formattedData = {
            lectures: Number(scrape.lectures?.split(":").at(-1)),
            oaa: Number(scrape.oaa?.split(":").at(-1)),
            oaaPlusAttendance: Number(scrape.oaaPlusAttendance?.split(":").at(-1)),
         }
         return {
            oaa: formattedData.oaa,
            absent: formattedData.lectures - formattedData.oaaPlusAttendance,
            present: formattedData.oaaPlusAttendance - formattedData.oaa,
         }
      },
   })
}