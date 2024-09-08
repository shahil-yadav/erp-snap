import { auth } from "@/components/auth/services/auth";
import { ReactImage } from "@/components/image";
import { Body, Footer, Layout, Navbar } from "@/components/layout";
import { Watermark } from "@/components/watermark";
import { queryClient } from "@/main";
import { profileOptions } from "@/routes/_auth.profile";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === "loggedOut") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
    return {
      username: auth.username,
      password: auth.password,
    };
  },
  component: Root,
});

function Root() {
  const profileImage = useAsync<string | undefined>(
    queryClient.ensureQueryData(profileOptions()).then((res) => res.profileImage),
  );

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
          <ReactImage src={profileImage} className="h-14 w-10" />
        </Link>
      </Navbar>

      <Back />

      <Body>
        <Outlet />
      </Body>

      <Footer>
        <Watermark />
      </Footer>
    </Layout>
  );
}

function Back() {
  return (
    <div className="mb-5">
      <Link to="..">
        <CircleArrowLeft className="h-7 w-7" />
      </Link>
    </div>
  );
}

function useAsync<T>(promise: Promise<T>) {
  const [state, setState] = useState<T>();
  useEffect(() => {
    (async () => {
      const output = await promise;
      setState(output);
    })();
  }, []);

  return state;
}
