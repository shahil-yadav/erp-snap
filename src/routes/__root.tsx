import { Auth } from "@/components/auth/services/types"
import { Toaster } from "@/components/ui/toaster"
import { useTheme } from "@/hooks/useTheme"
import { type QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { SafeArea } from "capacitor-plugin-safe-area"
import { ReactNode, useEffect } from "react"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
   auth: Auth
}>()({
   component: RootComponent,
})

function RootComponent() {
   return (
      <SafeAreaView>
         <div className="h-screen-safe">
            <Outlet />
         </div>
         {/* <TanStackRouterDevtools /> */}
         <ReactQueryDevtools position="bottom" />
         <Toaster />
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

   return <main className="m-safe px-5 font-manrope">{children}</main>
}
