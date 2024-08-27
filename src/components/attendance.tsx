import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartConfig,
   ChartContainer,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { CircleArrowOutUpLeft } from "lucide-react";

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
} satisfies ChartConfig;

export function Attendance(props: { oaa: number; present: number; absent: number }) {
   const chartData = [{ present: props.present, absent: props.absent, oaa: props.oaa }];
   const perecentage = (
      ((props.present + props.oaa) / (props.present + props.oaa + props.absent)) *
      100
   ).toFixed(3);

   return (
      <Card className="flex flex-col">
         <CardHeader className="pb-0">
            <CardTitle className="text-xl decoration-1 font-semibold">Attendance</CardTitle>
            <CardDescription></CardDescription>
         </CardHeader>
         <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
               config={chartConfig}
               className="mx-auto aspect-square max-w-[250px] w-full"
            >
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
                              );
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
                  <div
                     className="w-4 rounded-full h-4"
                     style={{ backgroundColor: chartConfig.oaa.color }}
                  />
               </div>
               <div className="flex items-center gap-2">
                  <span>Absent</span>
                  <div
                     className="w-4 rounded-full h-4"
                     style={{ backgroundColor: chartConfig.absent.color }}
                  />
               </div>
            </div>
            <CircleArrowOutUpLeft className="w-4 self-end h-4" />
         </CardFooter>
      </Card>
   );
}
