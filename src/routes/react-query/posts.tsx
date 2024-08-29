import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { postsQueryOptions } from "@/lib/react-query/postsQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/react-query/posts")({
   component: PostComponent,
   loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsQueryOptions),
});

function PostComponent() {
   const postsQuery = useSuspenseQuery(postsQueryOptions);
   const posts = postsQuery.data;

   if (postsQuery.isLoading) return <Skeleton className="h-52" />;

   return (
      <div className="p-2 flex gap-2">
         <ul className="list-disc pl-4">
            {[...posts, { id: "i-do-not-exists", title: "Non-existent Post" }].map((post) => (
               <li className="whitespace-nowrap" key={post.id}>
                  <Link>
                     <div>{post.title.substring(0, 20)}</div>
                  </Link>
               </li>
            ))}
         </ul>
         <Separator />
         {/* <Outlet /> */}
      </div>
   );
}
