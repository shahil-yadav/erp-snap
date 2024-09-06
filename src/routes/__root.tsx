import { Auth } from "@/components/auth/services/types"
import { Spinner } from "@/components/spinner"
import { Toaster } from "@/components/ui/toaster"
import { queryClient } from "@/main"
import { profileOptions } from "@/routes/_auth.profile"
import { type QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRouteWithContext, Link, Outlet, useMatchRoute } from "@tanstack/react-router"
import { SafeArea } from "capacitor-plugin-safe-area"
import { CircleArrowLeft } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"
import PullToRefresh from "react-simple-pull-to-refresh"
import { useTheme } from "@/hooks/useTheme"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
   auth: Auth
}>()({
   component: RootComponent,
})

function useAsync<T>(promise: Promise<T>) {
   const [state, setState] = useState<T>()
   useEffect(() => {
      ;(async () => {
         const output = await promise
         setState(output)
      })()
   }, [])
   return state
}

function RootComponent() {
   const profileImage = useAsync<string | undefined>(
      queryClient.ensureQueryData(profileOptions()).then((res) => res.profileImage)
   )

   return (
      <>
         <SafeAreaView>
            <PullToRefresh refreshingContent={<Spinner />} onRefresh={() => queryClient.refetchQueries()}>
               <>
                  {/* <Separator className="my-2" /> */}
                  <nav className="flex my-5 justify-between">
                     <Link to="/">
                        <div className="flex">
                           <h1 className="font-impact text-5xl">ERP PSIT</h1>
                           <h2 className="text-xs -m-[2px] self-end">Unofficial</h2>
                        </div>
                     </Link>
                     <Link to="/login">
                        {/* <img className="w-10 rounded-md" src={profileImage ?? "images/avatar.png"} alt="Avatar" />
                         */}
                        {profileImage?.slice(0, 5)}
                     </Link>
                  </nav>
                  <Back />
                  <Outlet />
               </>
            </PullToRefresh>
            {/* <TanStackRouterDevtools /> */}
            <ReactQueryDevtools position="bottom" />
            <Toaster />
         </SafeAreaView>
      </>
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

   return <main className="m-safe px-5 py-2 font-manrope">{children}</main>
}
