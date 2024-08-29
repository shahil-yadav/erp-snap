import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginWithUsernameAndPassword } from "@/scrape/login";
import { auth } from "@/utils/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";
import { FormEvent, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
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
      if (status === "login" && search.redirect) {
         router.history.push(search.redirect);
      }
   }, [status, search.redirect]);

   return (
      <>
         {status === "logout" && <SignIn />}
         {status === "login" && <SignOut />}
      </>
   );
}

function SignOut() {
   const router = useRouter();
   return (
      <>
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
      </>
   );
}

function SignIn() {
   const router = useRouter();
   const auth = Route.useRouteContext({
      select: ({ auth }) => auth,
   });
   const [username, setUsername] = useState<number>();
   const [password, setPassword] = useState<string>();
   const [erorr, setErorr] = useState<string>();

   async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
      ev.preventDefault();
      console.log("Form ran");
      if (username !== undefined && isNaN(username) === false && password !== undefined) {
         const isSuccess = await loginWithUsernameAndPassword(username, password);
         if (!isSuccess) {
            const err = "The credentials are incorrect";
            toast.error(err);
            setErorr(err);
         } else {
            auth.login(username, password);
            console.log("Logged in successfully..");
            router.invalidate();
         }
      }
   }

   return (
      <form onSubmit={handleSubmit} className="mx-auto max-w-lg mt-20 px-10 space-y-5">
         <h1 className="font-impact text-7xl">ERP</h1>
         <div className="space-y-2">
            <Input
               className={cn(erorr && "border-red-500")}
               onChange={(e) => setUsername(Number(e.target.value))}
               placeholder="Roll Number"
               role="username"
               type="text"
            />
            <Input
               className={cn(erorr && "border-red-500")}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               role="password"
               type="text"
            />
         </div>
         <div className="flex w-full justify-end">
            <Button variant="outline" type="submit">
               <LogIn className="w-4 h-4 mr-2" />
               Login
            </Button>
         </div>
         <p className="text-red-500 font-semibold">{erorr}</p>
      </form>
   );
}
