import { TableCell, TableRow } from "@/components/ui/table"
import { options } from "@/routes/_auth/time-table/-query-options"
import { useQuery } from "@tanstack/react-query"

export type WeeksType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

function Periods({ day }: { day: WeeksType }) {
    const { data } = useQuery(options())
    return data?.table.map((entry) => (
        <TableRow key={entry.timing}>
            <TableCell className="font-medium">{entry.timing}</TableCell>
            <TableCell>{entry[day].class ?? "⁉️"}</TableCell>
            <TableCell>{entry[day].faculty ?? "⁉️"}</TableCell>
            <TableCell>{entry[day].subject ?? "⁉️"}</TableCell>
        </TableRow>
    ))
}

export { Periods }
