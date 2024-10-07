import { auth } from "@/components/auth/services/auth"
import { erp } from "@/utils/erp"
import * as cheerio from "cheerio"
import { queryOptions, skipToken } from "@tanstack/react-query"
import { queryStatusAtNight } from "@/routes/_auth/time-table"

function options() {
    return queryOptions({
        queryFn:
            queryStatusAtNight() === false
                ? async () => {
                      const html = await erp.get(
                          "https://erp.psit.ac.in/Student/MyTimeTable",
                          auth.username,
                          auth.password,
                      )

                      const $ = cheerio.load(html.data)
                      const data = $.extract({
                          time: [
                              {
                                  selector:
                                      "#content > div:nth-child(4) > div > div.panel.panel-inverse > div.panel-body > div > table > thead > tr > th > center",
                              },
                          ],
                          weeks: [
                              {
                                  selector:
                                      "#content > div:nth-child(4) > div > div.panel.panel-inverse > div.panel-body > div > table > tbody > tr",
                                  value: {
                                      day: "td:nth-child(1)",
                                      periods: [{ selector: "td:nth-child(n+2)" }],
                                  },
                              },
                          ],
                      })

                      const formattedData = {
                          timings: data.time.map((val) => val.slice(3)),
                          // weeks: data.weeks.map((entry) => entry.day),
                          weeks: {
                              object: data.weeks.reduce(
                                  (prevObject, week, idx) => ({
                                      ...prevObject,
                                      [idx + 1]: week.day,
                                  }),
                                  {},
                              ),
                              arr: data.weeks.map((entry) => entry.day),
                          },
                          lectures: data.weeks
                              .filter((entry) => entry.day && entry.periods)
                              .reduce(
                                  (prevObject, lecture) => ({
                                      ...prevObject,
                                      [lecture.day as string]: lecture.periods,
                                  }),
                                  {},
                              ) as { [index: string]: string },
                      }

                      const table = formattedData.timings.map((timing, _) => ({
                          timing,
                          ...formattedData.weeks.arr
                              .filter((entry) => entry !== undefined)
                              .reduce((prev, day) => {
                                  let periods = formattedData.lectures[day][_].replace(
                                      /(\r\n|\n|\r|\t)/gm,
                                      "",
                                  )
                                  const regex = /\[(.*?)\]/g
                                  periods = Array.from(periods.matchAll(regex), (m) => m[1])
                                      .map((val) => val.trim())
                                      .reverse()

                                  if (day !== undefined) {
                                      return {
                                          ...prev,
                                          [day]: periods,
                                      }
                                  } else {
                                      return {
                                          ...prev,
                                      }
                                  }
                              }, {}),
                      })) as unknown as {
                          timing: string
                          [index: string]: string
                      }[]

                      return {
                          table,
                          days: formattedData.weeks.object as { [key: number]: string },
                      }
                  }
                : skipToken,
        queryKey: ["time-table"],
    })
}

export { options }
