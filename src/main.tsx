import { Spinner } from "@/components/spinner"
import { Toaster } from "@/components/ui/sonner"
import { routeTree } from "@/routeTree.gen.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

export type Auth = {
   login: (username: number, password: string) => void
   logout: () => void
   status: "loggedIn" | "loggedOut"
   username?: number
   password?: string
}

export const auth: Auth = {
   status: "loggedOut",

   login(username, password) {
      this.status = "loggedIn"
      this.username = username
      this.password = password
   },

   logout() {
      this.status = "loggedOut"
      this.username = undefined
      this.password = undefined
   },
}

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         gcTime: 1000 * 60 * 60 * 24,
         staleTime: 2000,
         retry: 0,
      },
   },
})
const router = createRouter({
   routeTree,
   context: {
      auth: undefined!,
      queryClient,
   },
   defaultPendingComponent: () => (
      <div className="p-2 text-2xl">
         <Spinner />
      </div>
   ),
   defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
   defaultPreload: "intent",
   /**
    * Since we're using React Query, we don't want loader calls to ever be stale.
    * This will ensure that the loader is always called when the route is preloaded or visited
    */
   defaultPreloadStaleTime: 0,
})

/** Register the router instance for type safety */
declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
   const root = createRoot(rootElement)
   root.render(
      <StrictMode>
         <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ auth }} />
            <Toaster richColors />
         </QueryClientProvider>
      </StrictMode>
   )
}
