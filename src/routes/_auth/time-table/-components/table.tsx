import { Days } from "@/components/days-combobox"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Periods } from "@/routes/_auth/time-table/-components/periods"
import { getCurrentDay } from "@/routes/_auth/time-table/-utils/get-current-day"
import { useState } from "react"

const TimeTable = () => {
    const [day, setDay] = useState(() => getCurrentDay())

    if (day === null)
        return (
            <div>
                <p>Please report this bug to dev on github issues portal</p>
                <Button>
                    <a href="https://github.com/shahil-yadav/erp-snap/issues">Report Bug</a>
                </Button>
            </div>
        )

    return (
        <Table>
            <TableCaption>Timetable</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3">Timings</TableHead>
                    <TableHead>
                        <Days value={day} setValue={setDay} />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Periods day={day} />
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell className="text-center" colSpan={2}>
                        Timetable
                    </TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}

export default TimeTable
