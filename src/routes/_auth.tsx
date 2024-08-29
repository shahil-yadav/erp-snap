import { auth } from "@/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
   beforeLoad: ({ context, location }) => {
      if (context.auth.status === "logout") {
         throw redirect({
            to: "/login",
            search: {
               redirect: location.href,
            },
         });
      }

      return {
         username: auth.username,
         password: auth.password,
      };
   },
});
