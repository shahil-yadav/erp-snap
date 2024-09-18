import { Auth } from "@/components/auth/services/types"
import { Toaster } from "@/components/ui/toaster"
import { useReleaseUpdate } from "@/hooks/use-release"
import { useOfflineToast } from "@/hooks/use-offline-toast"
import { useTheme } from "@/hooks/use-theme"
import { type QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { SafeArea } from "capacitor-plugin-safe-area"
import { ReactNode, useEffect } from "react"

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
    auth: Auth
    isRestoring: boolean
    connected: boolean
}>()({
    component: RootComponent,
})

function RootComponent() {
    useOfflineToast()
    useReleaseUpdate()
    return (
        <SafeAreaView>
            <Outlet />
            <Toaster />
            <ReactQueryDevtools position="bottom" />
        </SafeAreaView>
    )
}

function SafeAreaView({ children }: { children?: ReactNode }) {
    useTheme()
    useEffect(() => {
        ;(async function () {
            const safeAreaData = await SafeArea.getSafeAreaInsets()
            const { insets } = safeAreaData
            for (const [key, value] of Object.entries(insets)) {
                document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`)
            }
        })()
    }, [])

    return <main>{children}</main>
}
