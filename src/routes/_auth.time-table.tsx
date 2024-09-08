import { auth } from "@/components/auth/services/auth";
import { Days } from "@/components/days-combobox";
import { NetworkInfo } from "@/components/network-info";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDisplayToast } from "@/hooks/useDisplayToast";
import { erp } from "@/utils/erp";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import * as cheerio from "cheerio";
import { useState } from "react";

export const Route = createFileRoute("/_auth/time-table")({
  component: TimeTable,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
});

function TimeTable() {
  const { data, dataUpdatedAt, error, isError, isSuccess, isFetching } =
    useSuspenseQuery(options());
  const [day, setDay] = useState(data.days[new Date().getDay()]);

  useDisplayToast(dataUpdatedAt);
  return (
    <div className="space-y-5">
      <NetworkInfo
        dataUpdatedAt={dataUpdatedAt}
        error={error}
        isError={isError}
        isLoading={isFetching}
        isSuccess={isSuccess}
      />
      <Table className="">
        <TableCaption>Timetable</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Timings</TableHead>
            <TableHead>
              <Days value={day} setValue={setDay} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.table.map((entry) => (
            <TableRow key={entry.timing}>
              <TableCell className="font-medium">{entry.timing}</TableCell>
              {day ? (
                <TableCell className="">{entry[day] !== "" ? entry[day] : "❌"}</TableCell>
              ) : (
                <TableCell>⁉️</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {/* <TableRow>
                  <TableCell className="text-right" colSpan={2}>
                  </TableCell>
               </TableRow> */}
        </TableFooter>
      </Table>
    </div>
  );
}

function options() {
  return queryOptions({
    queryKey: ["time-table"],
    queryFn: async () => {
      const html = await erp.get(
        "https://erp.psit.ac.in/Student/MyTimeTable",
        auth.username,
        auth.password,
      );

      const $ = cheerio.load(html.data);
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
      });

      const formattedData = {
        timings: data.time.map((val) => val.slice(3)),
        // weeks: data.weeks.map((entry) => entry.day),
        weeks: {
          object: data.weeks.reduce(
            (prevObject, week, idx) => ({ ...prevObject, [idx + 1]: week.day }),
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
      };

      const table = formattedData.timings.map((timing, _) => ({
        timing,
        ...formattedData.weeks.arr
          .filter((entry) => entry !== undefined)
          .reduce(
            (prev, day) => ({
              ...prev,
              [day]: formattedData.lectures[day][_].replace(/(\r\n|\n|\r|\t)/gm, ""),
            }),
            {},
          ),
      })) as unknown as {
        timing: string;
        [index: string]: string;
      }[];

      return {
        table,
        days: formattedData.weeks.object as { [key: number]: string },
      };
    },
  });
}
