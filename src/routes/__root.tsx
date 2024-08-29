import { Spinner } from "@/components/spinner";
import { Auth } from "@/utils/auth";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

/*
const TanStackRouterDevtools =
   process.env.NODE_ENV === "production"
      ? () => null
      : lazy(() =>
           import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
           }))
        );
*/

export const Route = createRootRouteWithContext<{
   queryClient: QueryClient;
   auth: Auth;
}>()({
   component: RootComponent,
   notFoundComponent: () => (
      <div>
         <p>This is the not found component configured on root route</p>
         <Link to="/">Start Over</Link>
      </div>
   ),
   errorComponent: () => (
      <div className="h-screen flex flex-col justify-center items-center">
         <p className="text-red-500">Some error occured </p>
         <Link to="/">Start Over</Link>
      </div>
   ),
});

function RootComponent() {
   return (
      <main>
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
               <Link to="/react-query/posts" className="[&.active]:font-bold">
                  Posts
               </Link>
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
         </ScrollArea>
         <Separator className="my-2" />
         <Outlet />
         <TanStackRouterDevtools position="bottom-right" />
         <ReactQueryDevtools position="right" />
      </main>
   );
}

function RouterSpinner() {
   const isLoading = useRouterState({ select: (s) => s.status === "pending" });
   return <Spinner show={isLoading} />;
}
