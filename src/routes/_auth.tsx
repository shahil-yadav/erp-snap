import { auth } from "@/components/auth/services/auth"
import { ReactImage } from "@/components/image"
import { Body, Layout, Navbar } from "@/components/layout"
import { Spinner } from "@/components/spinner"
import { analytics } from "@/lib/firebase"
import { queryClient } from "@/main"
import { profileOptions } from "@/routes/_auth.profile"
import { useIsFetching } from "@tanstack/react-query"
import { createFileRoute, Link, Outlet, redirect, useMatchRoute } from "@tanstack/react-router"
import { logEvent } from "firebase/analytics"
import { CircleArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/_auth")({
    beforeLoad: ({ context, location }) => {
        if (context.auth.status === "loggedOut") {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href,
                },
            })
        }
        return {
            username: auth.username,
            password: auth.password,
        }
    },
    component: Root,
})

function Root() {
    const profileImage = useAsync<string | undefined>(
        queryClient.ensureQueryData(profileOptions).then((res) => {
            logEvent(analytics, "login", { name: res.name })
            return res.profileImage
        }),
    )
    const isFetching = useIsFetching()
    return (
        <Layout>
            <Navbar>
                <Link to="/">
                    <div className="relative flex">
                        <h1 className="font-impact text-5xl">ERP PSIT</h1>
                        <h2 className="-m-[2px] self-end text-xs">Unofficial</h2>
                        <div className="absolute right-2 top-2">{!!isFetching && <Spinner />}</div>
                    </div>
                </Link>
                <Link to="/login">
                    <ReactImage src={profileImage} className="h-14 w-10" />
                </Link>
            </Navbar>

            <Back />

            <Body>
                <Outlet />
            </Body>

            {/* <Footer>
                <Watermark />
            </Footer> */}
        </Layout>
    )
}

function Back() {
    const params = useMatchRoute()({ to: "/" })
    return (
        !params && (
            <div className="mb-2">
                <Link to="/">
                    <CircleArrowLeft className="h-7 w-7" />
                </Link>
            </div>
        )
    )
}

function useAsync<T>(promise: Promise<T>) {
    const [state, setState] = useState<T>()

    useEffect(() => {
        ;(async () => {
            const output = await promise
            setState(output)
        })()
    }, [promise])

    return state
}
