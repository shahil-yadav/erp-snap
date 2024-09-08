import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 24 * 60 * 60 * 1000, // 24 hrs -> ms
      staleTime: 10 * 60 * 1000, // 10 minutes -> ms
      // staleTime: 0,
      retry: 0,
    },
  },
});

export { queryClient };
