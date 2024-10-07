import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { analytics } from "@/lib/firebase"
import { Link, createFileRoute } from "@tanstack/react-router"
import { logEvent } from "firebase/analytics"

export const Route = createFileRoute("/_auth/")({
    component: Homepage,
})

function Homepage() {
    return (
        <main className="">
            <section className="space-y-5">
                <div>
                    <p className="text-lg font-semibold">{greetingTime(new Date())}</p>
                    <p>Hope you have a great day today</p>
                </div>
                <div className="flex justify-between">
                    <div className="space-y-5 self-end">
                        {/* <div className="flex items-center gap-2">
                            <a href="https://www.github.com/shahil-yadav/erp-snap">
                                <img className="h-8 w-10" src="images/github.png" alt="Github" />
                            </a>
                            <a href="https://www.linkedin.com/in/shahilyadav">
                                <img className="size-10" src="images/linkedin.png" alt="LinkedIn" />
                            </a>
                        </div> */}
                        <p className="text-xs">What do you want to do today ?</p>
                    </div>
                    <div className="">
                        <img className="aspect-video h-36 w-48" src="images/hero.png" alt="Hero" />
                    </div>
                </div>
            </section>

            <section className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Link
                    onClick={() => {
                        logEvent(analytics, "page_view", {
                            page_path: "/profile",
                            page_title: "Profile",
                        })
                    }}
                    to="/profile"
                >
                    <Tile
                        heading="Hiee 👋"
                        src="images/profile.png"
                        footer={{ aux: "Explore", main: "Profile" }}
                    />
                </Link>
                <Link
                    onClick={() => {
                        logEvent(analytics, "page_view", {
                            page_path: "/notifications",
                            page_title: "Notifications",
                        })
                    }}
                    to="/notifications"
                >
                    <Tile
                        heading="Notifications"
                        src="images/notifications.png"
                        footer={{ aux: "Listen to the latest", main: "Announcements" }}
                    />
                </Link>
                <Link
                    onClick={() => {
                        logEvent(analytics, "page_view", {
                            page_path: "/time-table",
                            page_title: "Time table",
                        })
                    }}
                    to="/time-table"
                >
                    <Tile
                        heading={
                            [
                                "Sunday",
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ][new Date().getDay()]
                        }
                        src="images/timetable.png"
                        footer={{ aux: "Explore", main: "Timetable" }}
                    />
                </Link>
                <Link
                    onClick={() => {
                        logEvent(analytics, "page_view", {
                            page_path: "/attendance",
                            page_title: "Attendance",
                        })
                    }}
                    to="/attendance"
                >
                    <Tile
                        heading="Attendance"
                        src="images/attendance.png"
                        footer={{ aux: "Explore", main: "Stats" }}
                    />
                </Link>
            </section>
        </main>
    )
}

interface TileProps {
    heading: string
    src: string
    footer: {
        aux: string
        main: string
    }
}

function Tile({ heading, src, footer }: TileProps) {
    return (
        <Card className="rounded-md bg-secondary bg-opacity-70">
            <CardHeader className="px-2 py-4">
                <CardTitle className="text-xl font-extrabold">{heading}</CardTitle>
            </CardHeader>
            <CardContent>
                <img className="mx-auto size-20" src={src} alt="" />
            </CardContent>
            <CardFooter className="flex-col items-end">
                <p className="text-[10px]">{footer.aux}</p>
                <p className="text-sm font-extrabold">{footer.main}</p>
            </CardFooter>
        </Card>
    )
}

function greetingTime(date: Date) {
    const hour = date.getHours()
    if (hour >= 5 && hour < 12) {
        return "Good morning"
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon"
    } else if ((hour >= 17 && hour <= 23) || hour < 5) {
        return "Good evening"
    }
}
