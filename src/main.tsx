import { auth } from "@/components/auth/services/auth"
import { Spinner } from "@/components/spinner"
import { ConnectionStatusProvider, useConnectionStatusContext } from "@/context/connection-status"
import { analytics } from "@/lib/firebase"
import { routeTree } from "@/routeTree.gen.ts"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { QueryClient, useIsRestoring } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router"
import { logEvent } from "firebase/analytics"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

logEvent(analytics, "exception")

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 24 * 60 * 60 * 1000, // 24 hrs -> ms
            staleTime: 10 * 60 * 1000, // 10 minutes -> ms
            // staleTime: 0,
            retry: 0,
        },
        dehydrate: {
            shouldDehydrateQuery: () => true,
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
        connected: undefined!,
        isRestoring: undefined!,
        queryClient,
    },

    defaultPendingComponent: () => (
        <div className="flex items-center justify-center h-screen-safe">
            <div className="scale-[2]">
                <Spinner />
            </div>
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
            <PersistQueryClientProvider
                onSuccess={() => {
                    queryClient.resumePausedMutations().then(() => {
                        queryClient.invalidateQueries()
                    })
                }}
                persistOptions={{ persister }}
                client={queryClient}
            >
                <Router />
            </PersistQueryClientProvider>
        </StrictMode>,
    )
}

function Router() {
    const isRestoring = useIsRestoring()
    const { connected } = useConnectionStatusContext()
    return (
        <ConnectionStatusProvider>
            <RouterProvider router={router} context={{ auth, isRestoring, connected }} />
        </ConnectionStatusProvider>
    )
}
