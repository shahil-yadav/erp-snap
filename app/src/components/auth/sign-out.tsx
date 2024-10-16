import { auth } from "@/components/auth/services/auth"
import { analytics } from "@/lib/firebase"
import { queryClient } from "@/main"
import { Link, useRouter } from "@tanstack/react-router"
import { logEvent } from "firebase/analytics"
import { LogOutIcon } from "lucide-react"

export function SignOut() {
    const router = useRouter()
    return (
        <div className="mx-auto max-w-md text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <LogOutIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Sign Out
            </h1>
            <p className="mt-4 text-muted-foreground">
                Are you sure you want to sign out of your account?
            </p>
            <p className="text-destructive">
                This will reset the state of the application and the saved profile would be deleted.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                    onClick={() => {
                        queryClient.removeQueries()
                        auth.logout()
                        router.invalidate()
                        logEvent(analytics, "sign_out")
                    }}
                    className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Sign Out
                </button>
                <Link
                    to="/"
                    className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted hover:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    Cancel
                </Link>
            </div>
        </div>
    )
}
