import { Spinner } from "@/components/spinner";
import { routeTree } from "@/routeTree.gen.ts";
import { auth } from "@/utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, ErrorComponent, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();
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
});

/** Register the router instance for type safety */
declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router;
   }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
   const root = createRoot(rootElement);
   root.render(
      <StrictMode>
         <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ auth }} />
            <Toaster richColors />
         </QueryClientProvider>
      </StrictMode>
   );
}
