import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { animated, useSpring } from "@react-spring/web"

export function AbsentRecords({
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
            <h2 className="mb-3 text-right text-2xl font-semibold">Absent Records</h2>
            <div className="space-y-6">
                {record.map(({ date, absent }) => (
                    <div className="flex items-center gap-4">
                        <p className="text-nowrap">{date}</p>
                        <ScrollArea className="whitespace-nowrap rounded-md">
                            <div className="flex w-max gap-2">
                                {absent.map((period) => (
                                    <animated.div
                                        style={{ ...springs }}
                                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-500 p-2 text-lg text-white"
                                    >
                                        {period}
                                    </animated.div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                ))}
            </div>
        </div>
    )
}
