import { NetworkInfo } from "@/components/network-info"
import { AbsentRecord } from "@/routes/_auth/attendance/-components/absent-records"
import { Chart } from "@/routes/_auth/attendance/-components/chart"
import { options } from "@/routes/_auth/attendance/-query-options"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/attendance/")({
    component: Attendance,
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function Attendance() {
    const query = useSuspenseQuery(options())
    const {
        data: { oaa, present, absent, tableDetails },
        dataUpdatedAt,
        error,
        isError,
        isSuccess,
        isFetching,
        isPaused,
    } = query

    if (oaa === -1 || present === -1 || absent === -1)
        return <p>Problem occured in parsing the webpage</p>

    return (
        <main className="space-y-5">
            <NetworkInfo
                dataUpdatedAt={dataUpdatedAt}
                error={error}
                isError={isError}
                isLoading={isFetching}
                isSuccess={isSuccess}
                isPaused={isPaused}
            />
            <div className="space-y-8">
                {oaa + present + absent === 0 ? (
                    <p>The session is not started yet</p>
                ) : (
                    <Chart oaa={oaa} present={present} absent={absent} />
                )}
                {tableDetails.length > 0 && <AbsentRecord record={tableDetails} />}
            </div>
        </main>
    )
}
