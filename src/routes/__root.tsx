import { Auth } from "@/components/auth/services/types"
import { Toaster } from "@/components/ui/toaster"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Link, Outlet, ScrollRestoration, useMatchRoute } from "@tanstack/react-router"
import { SafeArea } from "capacitor-plugin-safe-area"
import { CircleArrowLeft } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
   auth: Auth
}>()({
   component: RootComponent,
})

function RootComponent() {
   return (
      <SafeAreaView>
         {/* <Separator className="my-2" /> */}
         <nav className="flex my-5 justify-between">
            <Link to="/">
               <div className="flex">
                  <h1 className="font-impact text-5xl">ERP PSIT</h1>
                  <h2 className="text-xs -m-[2px] self-end">Unofficial</h2>
               </div>
            </Link>
            <Link to="/login">
               <img className="size-12" src="images/avatar.png" alt="Avatar" />
            </Link>
         </nav>
         <Back />
         <ScrollRestoration />
         <Outlet />
         {/* <TanStackRouterDevtools /> */}
         <ReactQueryDevtools position="bottom" />
         <Toaster />
      </SafeAreaView>
   )
}

function Back() {
   const matchRoute = useMatchRoute()
   const [render, setRender] = useState(false)

   useEffect(() => {
      if (matchRoute({ to: "/" }) || matchRoute({ to: "/login" })) setRender(false)
      else setRender(true)
   })

   return (
      render && (
         <div className="my-5">
            <Link to="..">
               <CircleArrowLeft className="w-7 h-7" />
            </Link>
         </div>
      )
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
   return <main className="m-safe px-5 py-2 font-manrope">{children}</main>
}

/*
function RouterSpinner() {
   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
   return <Spinner show={isLoading} />;
}
   */
