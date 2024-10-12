import { convertScrapedData } from "@/routes/_auth/time-table/-query-options/convert-scraped-data"
import { fetchWebContent } from "@/routes/_auth/time-table/-query-options/fetch-web-content"
import { queryStatusAtNight } from "@/routes/_auth/time-table/-utils/query-status-at-night"
import { queryOptions, skipToken } from "@tanstack/react-query"
import { z } from "zod"

// TODO Check this issue on git (zod)
/**
 * intersection between object() and record() parsing fails #2195
 * https://github.com/colinhacks/zod/issues/2195
 * z.record(
    z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]),
    z.array(z.string())),
 */
export const tableSchema = z.array(
    z.object({
        Friday: z.string(),
        Monday: z.string(),
        Saturday: z.string(),
        Wednesday: z.string(),
        Thursday: z.string(),
        Tuesday: z.string(),
        timing: z.string(),
    }),
)

const daysSchema = z.object({
    1: z.literal("Monday"),
    2: z.literal("Tuesday"),
    3: z.literal("Wednesday"),
    4: z.literal("Thursday"),
    5: z.literal("Friday"),
    6: z.literal("Saturday"),
})

function options() {
    return queryOptions({
        queryFn:
            queryStatusAtNight() === false
                ? async () => {
                      const json = await fetchWebContent()
                      const { table, weeks } = convertScrapedData(json)

                      /** Zod parsing of table schema */
                      const isTableParsed = tableSchema.safeParse(table)
                      if (!isTableParsed.success) throw new Error(isTableParsed.error.message)

                      const isDaysParsed = daysSchema.safeParse(weeks)
                      if (!isDaysParsed.success) throw new Error(isDaysParsed.error.message)

                      return {
                          days: isDaysParsed.data,
                          table: isTableParsed.data,
                      }
                  }
                : skipToken,

        queryKey: ["time-table"],
    })
}

export { options }
