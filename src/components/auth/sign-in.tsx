import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { queryClient } from "@/main"
import { Route } from "@/routes/login"
import { CapacitorCookies, CapacitorHttp } from "@capacitor/core"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { LogIn } from "lucide-react"
import { FormEvent, useState } from "react"

const credentials = {
   username: 2201641720092,
   password: "12345678",
}

export function SignIn() {
   const [username, setUsername] = useState<number>(credentials.username)
   const [password, setPassword] = useState<string>(credentials.password)

   const { mutate, isError, isPending, error } = useAuthenticateMutation()

   async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
      ev.preventDefault()
      mutate({ username, password })
   }

   return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto px-10 mt-20 space-y-5">
         <h1 className="font-impact text-7xl">ERP</h1>
         <div className="space-y-2">
            <Input
               className={cn(isError && "border-red-500", "text-lg")}
               defaultValue={username}
               onChange={(e) => setUsername(Number(e.target.value))}
               placeholder="Roll Number"
               role="username"
               type="text"
            />
            <Input
               className={cn(isError && "border-red-500", "text-lg")}
               defaultValue={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               role="password"
               type="text"
            />
         </div>
         <div className="flex w-full justify-end">
            <Button
               className={cn(isPending && "disabled:bg-emerald-500 disabled:text-white")}
               disabled={isPending}
               type="submit"
               variant="outline"
            >
               {isPending ? (
                  "Signing in ..."
               ) : (
                  <>
                     <LogIn className="w-4 h-4 mr-2" />
                     Login
                  </>
               )}
            </Button>
         </div>
         <p className="text-red-500 font-semibold">{error?.message}</p>
      </form>
   )
}

async function loginWithUsernameAndPassword({ username, password }: { username?: number; password?: string }) {
   if (username === undefined || password === undefined) throw new Error("Fill both username and password")
   if (isNaN(username)) throw new Error("Username must be in numbers only")

   await CapacitorCookies.clearAllCookies()

   console.log("Making a request to ERP", username, password)
   const response = await CapacitorHttp.post({
      url: "https://erp.psit.ac.in/Erp/Auth",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
         username,
         password,
      },
   })

   const headers = response.headers["refresh"] || response.headers["Refresh"]
   if (headers === undefined) throw new Error("Parsing the request [header] failed")

   // Testing purpose
   // const headers = "student"

   const isAuthenticated = Boolean(headers.match(/student/i))
   if (isAuthenticated) return { username, password }
}

function useAuthenticateMutation() {
   const router = useRouter()
   const auth = Route.useRouteContext({
      select: ({ auth }) => auth,
   })

   return useMutation({
      mutationFn: loginWithUsernameAndPassword,
      onSuccess: (data) => {
         if (data !== undefined) {
            auth.login(data.username, data.password)
            queryClient.invalidateQueries()
            router.invalidate()
         }
      },
   })
}
