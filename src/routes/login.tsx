import { SignIn } from "@/components/auth/sign-in";
import { SignOut } from "@/components/auth/sign-out";
import { ReactImage } from "@/components/image";
import { Body, Footer, Layout, Navbar } from "@/components/layout";
import { Watermark } from "@/components/watermark";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: Signin,
});

function Signin() {
  const router = useRouter();
  const status = Route.useRouteContext({
    select: ({ auth }) => auth.status,
  });
  const search = Route.useSearch();

  useLayoutEffect(() => {
    if (status === "loggedIn" && search.redirect) {
      router.history.push(search.redirect);
    }
  }, [status, search.redirect, router.history]);

  return (
    <Layout>
      <Navbar>
        <Link to="/">
          <div className="flex">
            <h1 className="font-impact text-5xl">ERP PSIT</h1>
            <h2 className="-m-[2px] self-end text-xs">Unofficial</h2>
          </div>
        </Link>
        <Link to="/login">
          <ReactImage src="images/avatar.png" className="size-12" />
        </Link>
      </Navbar>

      <Body>
        <div className="flex h-full items-center">
          {status === "loggedOut" && <SignIn />}
          {status === "loggedIn" && <SignOut />}
        </div>
      </Body>

      <Footer>
        <Watermark />
      </Footer>
    </Layout>
  );

  // return (
  //   <Layout>
  //     <Navbar>
  //       <Link to="/">
  //         <div className="flex">
  //           <h1 className="font-impact text-5xl">ERP PSIT</h1>
  //           <h2 className="-m-[2px] self-end text-xs">Unofficial</h2>
  //         </div>
  //       </Link>
  //       <Link to="/login">
  //         <ReactImage src="images/avatar.png" className="size-12" />
  //       </Link>
  //     </Navbar>

  //     <Body>
  //       {status === "loggedOut" && <SignIn />}
  //       {status === "loggedIn" && <SignOut />}
  //     </Body>

  //     <Footer>
  //       <Watermark />
  //     </Footer>
  //   </Layout>
  // );
}
