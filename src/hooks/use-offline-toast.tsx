import { ToastAction } from "@/components/ui/toast"
import { useConnectionStatusContext } from "@/context/connection-status"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

function useOfflineToast() {
    const { toast } = useToast()
    const { connected } = useConnectionStatusContext()
    useEffect(() => {
        if (connected === false)
            toast({
                variant: "destructive",
                title: "No internet connection",
                description:
                    "You are currently offline. Some features may not be available. Please check your internet connection and try again.",
                action: <ToastAction altText="close">Dismiss</ToastAction>,
            })
    }, [toast, connected])
}

export { useOfflineToast }
