import { TableCell, TableRow } from "@/components/ui/table"
import { options } from "@/routes/_auth/time-table/-query-options"
import { useSuspenseQuery } from "@tanstack/react-query"

export type WeeksType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

function Periods({ day }: { day: WeeksType }) {
    const { data } = useSuspenseQuery(options())
    return data.table.map((entry) => (
        <TableRow key={entry.timing}>
            <TableCell className="font-medium">{entry.timing}</TableCell>
            {day ? (
                entry[day].length === 0 ? (
                    <TableCell className="text-center">❌</TableCell>
                ) : (
                    <TableCell className="space-x-2">
                        {entry[day].map((period) => (
                            <span>{period},</span>
                        ))}
                    </TableCell>
                )
            ) : (
                <TableCell>⁉️</TableCell>
            )}
        </TableRow>
    ))
}

export { Periods }
