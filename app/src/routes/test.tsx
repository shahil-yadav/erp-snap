import { options } from "@/routes/_auth/time-table/-query-options"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test")({
    component: Test,
})

function Test() {
    const { error } = useSuspenseQuery(options())
    return <div>{error?.message}</div>
}
