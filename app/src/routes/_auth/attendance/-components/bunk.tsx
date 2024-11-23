import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OctagonAlert } from "lucide-react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { options } from "@/routes/_auth/attendance/-query"

export function Bunk() {
    const {
        data: { positiveDelta, negativeDelta, positiveDeltaOfPeriod, negativeDeltaOfPeriod },
    } = useSuspenseQuery(options())

    return (
        <Tabs defaultValue="day">
            <TabsList className="grid grid-cols-2">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="period">Period</TabsTrigger>
            </TabsList>
            <TabsContent value="day">
                <Card>
                    <CardHeader>
                        <CardTitle>Rate of increase/decrease</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <div>
                            <p>
                                Rate of increase of attendance -{" "}
                                <span className="font-semibold text-green-700 dark:text-green-500">
                                    {positiveDelta}%
                                </span>
                            </p>
                            <p>
                                Rate of decrease of attendance -{" "}
                                <span className="font-semibold text-red-700 dark:text-red-500">
                                    {negativeDelta}%
                                </span>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="items-center text-slate-500">
                        <FooterMessage />
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="period">
                <Card>
                    <CardHeader>
                        <CardTitle>Rate of increase/decrease</CardTitle>
                        <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p>
                                Rate of increase of attendance -{" "}
                                <span className="font-semibold text-green-700 dark:text-green-500">
                                    {positiveDeltaOfPeriod}%
                                </span>
                            </p>
                            <p>
                                Rate of decrease of attendance -{" "}
                                <span className="font-semibold text-red-700 dark:text-red-500">
                                    {negativeDeltaOfPeriod}%
                                </span>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="text-slate-500">
                        <FooterMessage />
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

function FooterMessage() {
    return (
        <>
            <OctagonAlert className="mr-5 shrink-0" />
            <p>
                The data is stored locally on your device. Clearing app's data will result in
                re-computation.
            </p>
        </>
    )
}
