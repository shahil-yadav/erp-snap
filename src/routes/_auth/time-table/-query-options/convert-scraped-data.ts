import { ExtractedMap } from "node_modules/cheerio/dist/esm/api/extract"
import { z } from "zod"

const lecturesSchema = z.object({
    Monday: z.array(z.string()),
    Tuesday: z.array(z.string()),
    Wednesday: z.array(z.string()),
    Thursday: z.array(z.string()),
    Friday: z.array(z.string()),
    Saturday: z.array(z.string()),
})

const weekSchema = z.array(
    z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
)

const timingsSchema = z.array(z.string()).length(8).nonempty()

export const convertScrapedData = (data: {
    time: string[]
    weeks: ExtractedMap<{
        day: string
        periods: [
            {
                selector: string
            },
        ]
    }>[]
}) => {
    const lectures = data.weeks.reduce((prevObject, lecture) => {
        if (lecture.day !== undefined) {
            lecture.periods = lecture.periods.map((period) => {
                period = period.replace(/(\n|\t)/g, "")
                const regex = /\[(.*?)\]/g
                period = Array.from(period.matchAll(regex), (data) => data[1])
                    .map((data) => data.trim())
                    .join(", ")
                return period
            })
            return {
                ...prevObject,
                [lecture.day]: lecture.periods,
            }
        }
        return { ...prevObject }
    }, {})

    const timings = data.time.map((val) =>
        val.match(/\d{1,2}:(\d{1,2})-(\d{1,2}):(\d{1,2})/g)?.at(0),
    )

    const weeks = {
        arr: data.weeks.map((entry) => entry.day),
        object: data.weeks.reduce(
            (prevObject, week, idx) => ({
                ...prevObject,
                [idx + 1]: week.day,
            }),
            {},
        ),
    }

    const areLecturesParsed = lecturesSchema.safeParse(lectures)
    if (!areLecturesParsed.success) throw new Error(areLecturesParsed.error.message)

    const areTimingsParsed = timingsSchema.safeParse(timings)
    if (!areTimingsParsed.success) throw new Error(areTimingsParsed.error.message)

    const areWeekDaysParsed = weekSchema.safeParse(weeks.arr)
    if (!areWeekDaysParsed.success) throw new Error(areWeekDaysParsed.error.message)

    const formattedData = {
        lectures: areLecturesParsed.data,
        timings: areTimingsParsed.data,
        weeks: { ...weeks, arr: areWeekDaysParsed.data },
    }

    const table = formattedData.timings.map((time, idx) => ({
        timing: time,
        ...formattedData.weeks.arr.reduce((prev, day) => {
            return {
                ...prev,
                [day]: formattedData.lectures[day][idx],
            }
        }, {}),
    }))

    return { table, weeks: formattedData.weeks.object }
}
