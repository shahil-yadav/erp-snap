import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

/**
 * The `useDisplayToast` function displays a toast notification if the data was last updated more than
 * 10 minutes ago.
 * @param {number} dataUpdatedAt - The `dataUpdatedAt` parameter in the `useDisplayToast` function
 * represents the timestamp of when the data was last updated. This timestamp is used to calculate the
 * duration since the data was last updated and display a toast message if the duration exceeds 10
 * minutes. The toast message informs the user to refresh
 */
export function useDisplayToast(dataUpdatedAt: number) {
   const { toast } = useToast()

   useEffect(() => {
      const duration = delta(dataUpdatedAt)

      if (duration > 10)
         toast({
            variant: "destructive",
            title: `Last updated  ${duration} minutes ago`,
            description: `Please refresh, ${new Date(dataUpdatedAt).toLocaleTimeString()}`,
            action: <ToastAction altText="close">Close</ToastAction>,
         })
   }, [])
}

/**
 * The function calculates the time difference in minutes between the current time and a specified
 * timestamp.
 * @param {number} dataUpdatedAt - The `dataUpdatedAt` parameter is a number representing the timestamp
 * of when the data was last updated.
 * @returns The function `delta` calculates the difference in minutes between the current time and a
 * provided `dataUpdatedAt` timestamp. The result is the number of minutes elapsed since the
 * `dataUpdatedAt` timestamp.
 */
export function delta(dataUpdatedAt: number) {
   return Math.round((new Date().getTime() - new Date(dataUpdatedAt).getTime()) / 1000 / 60)
}
