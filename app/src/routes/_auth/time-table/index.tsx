import { NetworkInfo } from "@/components/network-info"
import { Information } from "@/routes/_auth/time-table/-components/information"
import TimeTable from "@/routes/_auth/time-table/-components/table"
import { options } from "@/routes/_auth/time-table/-query-options"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/time-table/")({
    component: Page,
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function Page() {
    const { dataUpdatedAt, error, isError, isSuccess, isFetching, isPaused } = useQuery(options())
    return (
        <div className="space-y-5">
            <NetworkInfo
                dataUpdatedAt={dataUpdatedAt}
                error={error}
                isError={isError}
                isLoading={isFetching}
                isSuccess={isSuccess}
                isPaused={isPaused}
            />
            <Information />
            <TimeTable />
        </div>
    )
}
