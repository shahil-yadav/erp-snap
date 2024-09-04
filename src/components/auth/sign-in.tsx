import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Route } from "@/routes/login"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { LogIn } from "lucide-react"
import { FormEvent, useState } from "react"
import { loginIntoERP } from "./services/loginIntoERP"

const useCredentials = () => ({
   username: import.meta.env.VITE_APP_USERNAME,
   password: import.meta.env.VITE_APP_PASSWORD,
})

export function SignIn() {
   const [password, setPassword] = useState<string>(useCredentials().password || "")
   const [username, setUsername] = useState<string>(useCredentials().username || "")
   const { mutate, isError, isPending } = useAuthenticateMutation()

   async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
      ev.preventDefault()
      mutate({ argUsername: username, argPassword: password })
   }

   return (
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-24 px-10 space-y-5">
         <h2 className="text-lg font-semibold">Please login to continue, </h2>
         <div className="space-y-2">
            <Input
               className={cn("text-lg px-4 py-6", isError && "border-red-500")}
               defaultValue={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Roll Number"
               role="username"
               type="text"
            />
            <Input
               className={cn("text-lg px-4 py-6", isError && "border-red-500")}
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
      </form>
   )
}

function useAuthenticateMutation() {
   const router = useRouter()
   const { toast } = useToast()

   const auth = Route.useRouteContext({
      select: ({ auth }) => auth,
   })

   return useMutation({
      mutationKey: ["login"],
      mutationFn: loginIntoERP,
      onSuccess: (data) => {
         auth.login(data.username, data.password)
         router.invalidate()
         toast({
            title: "Login successfull",
            // description: "",
            action: <ToastAction altText="close">Close</ToastAction>,
         })
      },

      onError: (err) => {
         toast({
            variant: "destructive",
            title: err.message,
            action: <ToastAction altText="close">Close</ToastAction>,
         })
      },
   })
}
