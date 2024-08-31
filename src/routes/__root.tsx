import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Auth } from "@/main"
import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient
   auth: Auth
}>()({
   component: RootComponent,
})

function RootComponent() {
   return (
      <main className="mt-20">
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
      </main>
   )
}

/*
function RouterSpinner() {
   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
   return <Spinner show={isLoading} />;
}
   */
