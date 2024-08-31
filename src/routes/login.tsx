import { SignIn } from "@/components/auth/sign-in";
import { Button } from "@/components/ui/button";
import { auth } from "@/main";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useLayoutEffect } from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
   validateSearch: z.object({
      redirect: z.string().optional(),
   }),
   component: Login,
});

function Login() {
   const router = useRouter();
   const status = Route.useRouteContext({
      select: ({ auth }) => auth.status,
   });
   const search = Route.useSearch();

   useLayoutEffect(() => {
      if (status === "loggedIn" && search.redirect) {
         router.history.push(search.redirect);
      }
   }, [status, search.redirect]);

   return (
      <>
         {status === "loggedOut" && <SignIn />}
         {status === "loggedIn" && <SignOut />}
      </>
   );
}

function SignOut() {
   const router = useRouter();
   return (
      <div className="max-w-lg mx-auto px-10">
         <p>Username : {auth.username}</p>
         <p>Password : {auth.password}</p>
         <Button
            onClick={() => {
               auth.logout();
               router.invalidate();
            }}
            variant="ghost"
            type="submit"
         >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
         </Button>
      </div>
   );
}