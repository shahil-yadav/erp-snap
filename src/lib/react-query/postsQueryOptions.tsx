import { fetchPosts } from "@/lib/react-query/posts";
import { queryOptions } from "@tanstack/react-query";

export const postsQueryOptions = queryOptions({
   queryKey: ["posts"],
   queryFn: () => fetchPosts(),
});
