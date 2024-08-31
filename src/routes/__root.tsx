import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Auth } from "@/main"
import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode, useEffect } from "react"
import { SafeArea } from "capacitor-plugin-safe-area"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
   auth: Auth
}>()({
   component: RootComponent,
})

function RootComponent() {
   return (
      <SafeAreaView>
         <ScrollArea className="w-full py-5 whitespace-nowrap">
            <div className="flex gap-5">
               <Link to="/" className="[&.active]:font-bold">
                  Home
               </Link>
               <Link to="/profile" className="[&.active]:font-bold">
                  Profile
               </Link>
               <Link to="/login" className="[&.active]:font-bold">
                  Login
               </Link>
               <Link to="/notifications" className="[&.active]:font-bold">
                  Notifications
               </Link>
               <Link to="/attendance" className="[&.active]:font-bold">
                  Attendance
               </Link>
               <Link to="/time-table" className="[&.active]:font-bold">
                  Time table
               </Link>
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
         </ScrollArea>
         <Separator className="my-2" />
         <Outlet />
         {/* <TanStackRouterDevtools /> */}
         <ReactQueryDevtools position="bottom" />
      </SafeAreaView>
   )
}

function SafeAreaView({ children }: { children?: ReactNode }) {
   useEffect(() => {
      ;(async function () {
         const safeAreaData = await SafeArea.getSafeAreaInsets()
         const { insets } = safeAreaData
         for (const [key, value] of Object.entries(insets)) {
            document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`)
         }
      })()
   }, [])
   return <main className="m-safe">{children}</main>
}

/*
function RouterSpinner() {
   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
   return <Spinner show={isLoading} />;
}
   */
