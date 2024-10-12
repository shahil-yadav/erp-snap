import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { animated, useSpring } from "@react-spring/web"

function AbsentRecords({
    record,
}: {
    record: {
        date: string
        absent: number[]
    }[]
}) {
    const springs = useSpring({
        from: { x: -100 },
        to: { x: 0 },
    })
    return (
        <div>
            <h2 className="text-right text-2xl font-semibold">Absent Records</h2>
            {record.map(({ date, absent }) => (
                <div className="space-y-2">
                    <p className="">{date}</p>
                    <ScrollArea className="whitespace-nowrap rounded-md">
                        <div className="flex w-max gap-2 pb-6">
                            {absent.map((period) => (
                                <animated.div
                                    style={{ ...springs }}
                                    className="flex shrink-0 items-center justify-center rounded-md bg-rose-500 p-2 text-lg text-white dark:bg-rose-700"
                                >
                                    ABS ~ {period}
                                </animated.div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            ))}
        </div>
    )
}

export { AbsentRecords as AbsentRecord }
