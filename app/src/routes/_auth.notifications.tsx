import { auth } from "@/components/auth/services/auth"
import { NetworkInfo } from "@/components/network-info"
import { Separator } from "@/components/ui/separator"
import { erp } from "@/utils/erp"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import * as cheerio from "cheerio"
import { Bell } from "lucide-react"

export const Route = createFileRoute("/_auth/notifications")({
    component: Notifications,
    loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options),
})

function Notifications() {
    const query = useSuspenseQuery(options)
    const {
        data: { notifications },
        dataUpdatedAt,
        error,
        isError,
        isSuccess,
        isFetching,
        isPaused,
    } = query

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

            <div>
                {notifications.map((notification) => (
                    <>
                        <Link to={notification.link} className="flex items-center">
                            <Bell className="mr-5 aspect-square h-4 w-4 flex-shrink-0" />
                            <p>{notification.label}</p>
                        </Link>
                        <Separator className="my-3" />
                    </>
                ))}
            </div>
        </div>
    )
}

const options = {
    queryKey: ["notifications"],
    queryFn: async () => {
        const html = await erp.get("https://erp.psit.ac.in/Student", auth.username, auth.password)
        const $ = cheerio.load(html.data)
        const data = $.extract({
            notifications: [
                {
                    selector: "#style-3 > table > tbody > tr",
                    value: {
                        link: {
                            selector: "a",
                            value: "href",
                        },
                        label: "a",
                    },
                },
            ],
        })
        return data
    },
}
