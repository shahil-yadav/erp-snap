import { auth } from "@/components/auth/services/auth"
import { ReactImage } from "@/components/image"
import { Spinner } from "@/components/spinner"
import { queryClient } from "@/main"
import { profileOptions } from "@/routes/_auth.profile"
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"
import { CircleArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import PullToRefresh from "react-simple-pull-to-refresh"

export const Route = createFileRoute("/_auth")({
   beforeLoad: ({ context, location }) => {
      if (context.auth.status === "loggedOut") {
         throw redirect({
            to: "/login",
            search: {
               redirect: location.href,
            },
         })
      }
      return {
         username: auth.username,
         password: auth.password,
      }
   },
   component: Root,
})

function Root() {
   const profileImage = useAsync<string | undefined>(
      queryClient.ensureQueryData(profileOptions()).then((res) => res.profileImage)
   )

   return (
      <PullToRefresh
         refreshingContent={
            <div>
               <Spinner />
               <p>Refreshing Attendance, Timetable, Profile, Notifications</p>
            </div>
         }
         onRefresh={() => queryClient.refetchQueries()}
      >
         <>
            <nav className="flex my-5 justify-between">
               <Link to="/">
                  <div className="flex">
                     <h1 className="font-impact text-5xl">ERP PSIT</h1>
                     <h2 className="text-xs -m-[2px] self-end">Unofficial</h2>
                  </div>
               </Link>
               <Link to="/login">
                  <ReactImage src={profileImage} className="w-10 h-14" />
               </Link>
            </nav>
            <Back />
            <Outlet />
         </>
      </PullToRefresh>
   )
}

function Back() {
   return (
      <div className="my-5">
         <Link to="..">
            <CircleArrowLeft className="w-7 h-7" />
         </Link>
      </div>
   )
}

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
