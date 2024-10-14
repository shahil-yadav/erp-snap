import { queryStatusAtNight } from "@/routes/_auth/time-table/-utils/query-status-at-night"

export function Information() {
    return (
        queryStatusAtNight() && (
            <div className="rounded-md bg-secondary p-5">
                <p>
                    Serving the{" "}
                    <span className="font-semibold dark:text-green-500">cache data </span>
                    of time-table, you can refresh it in the morning at{" "}
                    <span className="dark:text-green-500">5 am.</span>
                </p>
            </div>
        )
    )
}
