import { auth } from "@/components/auth/services/auth"
import { erp } from "@/utils/erp"
import { queryOptions } from "@tanstack/react-query"
import * as cheerio from "cheerio"
import {
    negativeDelta,
    negativeDeltaOfPeriods,
    positiveDelta,
    positiveDeltaOfPeriods,
} from "@/routes/_auth/attendance/-query/delta.ts"

function options() {
    return queryOptions({
        queryKey: ["attendance"],
        queryFn: async () => {
            const html = await erp.get(
                "https://erp.psit.ac.in/Student/MyAttendanceDetail",
                auth.username,
                auth.password,
            )
            const $ = cheerio.load(html.data)
            const scrape = $.extract({
                lectures:
                    "#content > div > div > div > div.panel-body > div:nth-child(2) > span > strong",
                oaa: "#content > div > div > div > div.panel-body > div:nth-child(4) > span > a > strong",
                oaaPlusAbsent:
                    "#content > div > div > div > div.panel-body > div:nth-child(3) > span > strong",

                tableDetails: [
                    {
                        selector: "#data-table > tbody > tr",
                        value: {
                            period: ["td"],
                        },
                    },
                ],
            })

            const formattedTableDetails = scrape.tableDetails.map((data) => {
                const date = data.period[1]
                const absent = data.period
                    .slice(2)
                    .map((entry, index) => ({
                        periodNumber: index + 1,
                        state: entry,
                    }))
                    .filter((entry) => {
                        return entry.state !== ""
                    })
                    .map((entry) => entry.periodNumber)
                return { date, absent }
            })

            const formattedData = {
                lectures: Number(scrape.lectures?.match(/[0-9]+/)?.at(0) ?? -1),
                oaa: Number(scrape.oaa?.match(/[0-9]+/)?.at(0) ?? -1),
                oaaPlusAbsent: Number(scrape.oaaPlusAbsent?.match(/[0-9]+/)?.at(0) ?? -1),
                tableDetails: formattedTableDetails.reverse(),
            }

            const present = formattedData.lectures - formattedData.oaaPlusAbsent
            const absent = formattedData.oaaPlusAbsent - formattedData.oaa
            const oaa = formattedData.oaa
            const totalLectures = present + oaa + absent

            return {
                oaa,
                absent,
                present,
                positiveDelta: positiveDelta({ absent, oaa, totalLectures }),
                negativeDelta: negativeDelta({ absent, oaa, totalLectures }),
                positiveDeltaOfPeriod: positiveDeltaOfPeriods({ absent, oaa, totalLectures }),
                negativeDeltaOfPeriod: negativeDeltaOfPeriods({ absent, oaa, totalLectures }),
                tableDetails: formattedData.tableDetails,
            }
        },
    })
}

export { options }
