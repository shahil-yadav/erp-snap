import { z } from "zod"

const daysSchema = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])

function getCurrentDay() {
    const today = new Date()
    let dayOfWeek = today.getDay()

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    if (dayOfWeek === 0) dayOfWeek = 1

    const isParsed = daysSchema.safeParse(daysOfWeek[dayOfWeek])
    if (!isParsed.success) return null

    return isParsed.data
}

export { getCurrentDay }
