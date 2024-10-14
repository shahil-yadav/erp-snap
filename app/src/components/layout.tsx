import { useConnectionStatusContext } from "@/context/connection-status"
import { queryClient } from "@/main"
import { ReactNode, useRouter } from "@tanstack/react-router"
import { createContext } from "react"
import PullToRefresh from "react-simple-pull-to-refresh"

const LayoutContext = createContext(null)

function Layout({ children }: { children: ReactNode }) {
    const router = useRouter()

    const handleRefresh = () => async () => {
        await queryClient.refetchQueries()
        await router.invalidate()
    }
    return (
        <LayoutContext.Provider value={null}>
            <div className="h-screen p-safe px-safe-offset-3">
                <PullToRefresh onRefresh={handleRefresh()}>
                    <div className="flex h-full flex-col">{children}</div>
                </PullToRefresh>
            </div>
        </LayoutContext.Provider>
    )
}

Layout.Navbar = ({ children }: { children: ReactNode }) => {
    const { connected: isOnline } = useConnectionStatusContext()
    return (
        <nav className="space-y-5">
            {!isOnline && <div className="bg-destructive p-5">App in offline mode</div>}
            <div className="mb-5 flex justify-between">{children}</div>
        </nav>
    )
}

Layout.Body = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-1 flex-col overflow-auto">{children}</div>
)

Layout.Footer = ({ children }: { children: ReactNode }) => <div className="my-7">{children}</div>

const Navbar = Layout.Navbar
const Body = Layout.Body
const Footer = Layout.Footer

export { Body, Footer, Layout, Navbar }
