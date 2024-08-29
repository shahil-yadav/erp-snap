import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
   component: Profile,
});

function Profile() {
   const { username, password } = Route.useRouteContext();
   return (
      <div>
         <h2>Hello /_auth/profile!</h2>
         <p>Username: {username}</p>
         <p>Password: {password}</p>
      </div>
   );
}
