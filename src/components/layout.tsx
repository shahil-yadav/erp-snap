import { queryClient } from "@/main";
import { ReactNode } from "@tanstack/react-router";
import { createContext } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";

const LayoutContext = createContext(null);

function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutContext.Provider value={null}>
      <div className="h-screen p-safe px-safe-offset-3">
        <PullToRefresh onRefresh={() => queryClient.refetchQueries()}>
          <div className="flex h-full flex-col">{children}</div>
        </PullToRefresh>
      </div>
    </LayoutContext.Provider>
  );
}

Layout.Navbar = ({ children }: { children: ReactNode }) => (
  <nav className="mb-5 flex justify-between">{children}</nav>
);

Layout.Body = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-1 flex-col overflow-auto">{children}</div>
);

Layout.Footer = ({ children }: { children: ReactNode }) => <div className="my-7">{children}</div>;

const Navbar = Layout.Navbar;
const Body = Layout.Body;
const Footer = Layout.Footer;

export { Body, Footer, Layout, Navbar };
