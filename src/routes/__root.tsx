import { Separator } from "@/components/ui/separator";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools =
   process.env.NODE_ENV === "production"
      ? () => null
      : lazy(() =>
           import("@tanstack/router-devtools").then((res) => ({
              default: res.TanStackRouterDevtools,
           }))
        );

export const Route = createRootRoute({
   component: () => (
      <>
         <div className="mt-20 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
               Home
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
         <Separator className="my-2" />
         <Outlet />
         <TanStackRouterDevtools position="bottom-right" />
      </>
   ),
});
