import { auth } from "@/components/auth/services/auth"
import { SignIn } from "@/components/auth/sign-in"
import { ReactImage } from "@/components/image"
import { queryClient } from "@/main"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import { LogOutIcon } from "lucide-react"
import { useLayoutEffect } from "react"
import { z } from "zod"

export const Route = createFileRoute("/login")({
   validateSearch: z.object({
      redirect: z.string().optional(),
   }),
   component: Signin,
})

function Signin() {
   const router = useRouter()
   const status = Route.useRouteContext({
      select: ({ auth }) => auth.status,
   })
   const search = Route.useSearch()

   useLayoutEffect(() => {
      if (status === "loggedIn" && search.redirect) {
         router.history.push(search.redirect)
      }
   }, [status, search.redirect])

   return (
      <>
         <nav className="flex my-5 border-4 border-red-400 justify-between">
            <Link to="/">
               <div className="flex">
                  <h1 className="font-impact text-5xl">ERP PSIT</h1>
                  <h2 className="text-xs -m-[2px] self-end">Unofficial</h2>
               </div>
            </Link>
            <Link to="/login">
               <ReactImage src="images/avatar.png" className="size-12" />
            </Link>
         </nav>
         {status === "loggedOut" && <SignIn />}
         {status === "loggedIn" && <SignOut />}
      </>
   )
}

function SignOut() {
   const router = useRouter()
   return (
      <div className="flex flex-col mt-10 items-center justify-center bg-background px-4  sm:px-6 lg:px-8">
         <div className="mx-auto max-w-md text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
               <LogOutIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Sign Out</h1>
            <p className="mt-4 text-muted-foreground">Are you sure you want to sign out of your account?</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
               <button
                  onClick={() => {
                     queryClient.removeQueries()
                     auth.logout()
                     router.invalidate()
                  }}
                  className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
               >
                  Sign Out
               </button>
               <Link
                  to="/"
                  className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
               >
                  Cancel
               </Link>
            </div>
         </div>
      </div>
   )

   // return (
   //    <div className="max-w-lg mx-auto px-10">
   //       <p>Username : {auth.username}</p>
   //       <p>Password : {auth.password?.split("").map(() => "X")}</p>
   //       <Button
   //          onClick={() => {
   //             queryClient.removeQueries()
   //             auth.logout()
   //             router.invalidate()
   //          }}
   //          variant="ghost"
   //          type="submit"
   //       >
   //          <LogOut className="w-4 h-4 mr-2" />
   //          Logout
   //       </Button>
   //    </div>
   // )
}
