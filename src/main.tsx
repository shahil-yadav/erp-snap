import { auth } from "@/components/auth/services/auth"
import { Spinner } from "@/components/spinner"
import { routeTree } from "@/routeTree.gen.ts"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         gcTime: 1000 * 60 * 60 * 24, // 24 hrs -> ms
         staleTime: 1.5 * 60 * 60 * 1000, // 1.5 hrs -> ms
         retry: 0,
      },
   },
})

const persister = createSyncStoragePersister({
   storage: window.localStorage,
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
   defaultPreload: "viewport",
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
         <PersistQueryClientProvider
            onSuccess={() => {
               queryClient.resumePausedMutations().then(() => {
                  queryClient.invalidateQueries()
               })
            }}
            persistOptions={{ persister }}
            client={queryClient}
         >
            <RouterProvider router={router} context={{ auth }} />
         </PersistQueryClientProvider>
      </StrictMode>
   )
}
