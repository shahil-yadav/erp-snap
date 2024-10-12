import { html as TimeTableResponse } from "@/dummy/time-table"
import * as cheerio from "cheerio"

export const fetchWebContent = async () => {
    // const html = await erp.get(
    //     "https://erp.psit.ac.in/Student/MyTimeTable",
    //     auth.username,
    //     auth.password,
    // )
    const html = {
        data: TimeTableResponse,
    }
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

    return data
}
