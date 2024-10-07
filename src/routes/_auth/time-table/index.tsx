import { Days } from "@/components/days-combobox"
import { NetworkInfo } from "@/components/network-info"
import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { createFileRoute } from "@tanstack/react-router"
import { options } from "@/routes/_auth/time-table/-query-options"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/_auth/time-table/")({
    component: TimeTable,
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function TimeTable() {
    const { data, dataUpdatedAt, error, isError, isSuccess, isFetching, isPaused } =
        useSuspenseQuery(options())
    const [day, setDay] = useState(data.days[new Date().getDay()])

    return (
        <div className="space-y-5">
            <NetworkInfo
                dataUpdatedAt={dataUpdatedAt}
                error={error}
                isError={isError}
                isLoading={isFetching}
                isSuccess={isSuccess}
                isPaused={isPaused}
            />
            {queryStatusAtNight() && (
                <div className="rounded-md bg-secondary p-5">
                    <p>
                        Serving the{" "}
                        <span className="font-semibold dark:text-green-500">cache data </span>
                        of time-table, you can refresh it in the morning at{" "}
                        <span className="dark:text-green-500">5 am.</span>
                    </p>
                </div>
            )}
            <Table>
                <TableCaption>Timetable</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2">Timings</TableHead>
                        <TableHead>
                            <Days value={day} setValue={setDay} />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.table.map((entry) => (
                        <TableRow key={entry.timing}>
                            <TableCell className="font-medium">{entry.timing}</TableCell>
                            {day ? (
                                entry[day].length === 0 ? (
                                    "❌"
                                ) : (
                                    <TableCell className="space-y-1 text-center">
                                        {entry[day].map((period) => (
                                            <p>{period}</p>
                                        ))}
                                    </TableCell>
                                )
                            ) : (
                                <TableCell>⁉️</TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {/* <TableRow>
                  <TableCell className="text-right" colSpan={2}>
                  </TableCell>
               </TableRow> */}
                </TableFooter>
            </Table>
        </div>
    )
}

export function queryStatusAtNight() {
    const time = new Date().getHours()
    /** Disable at 11 o'clock */
    if (time >= 23 || time < 5) return true
    return false
}
