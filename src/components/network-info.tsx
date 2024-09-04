import { Spinner } from "@/components/spinner"
import { delta } from "@/hooks/useDisplayToast"
import { useEffect, useRef, useState } from "react"

export function NetworkInfo(props: {
   dataUpdatedAt: number
   error: Error | null
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}) {
   return (
      <div className="text-xs">
         {props.isLoading && (
            <div className="bg-yellow-500 p-5">
               Fetching the latest data from PSIT server <Spinner />
            </div>
         )}
         {props.isLoading === false && props.isSuccess && <Success dataUpdatedAt={props.dataUpdatedAt} />}
         {props.isError && <div className="bg-destructive p-5 text-destructive-foreground">{props.error?.message}</div>}
      </div>
   )
}

/**
 * The Success component displays the time elapsed since the data was last updated in minutes with an
 * auto-hide feature after 1.5 seconds.
 * @param props - The `Success` component takes a single prop `dataUpdatedAt`, which is a number
 * representing the timestamp when the data was last updated. This prop is used to calculate the time
 * difference in minutes between the current time and the `dataUpdatedAt` timestamp.
 * @returns The `Success` component is returning a `div` element with a background color class of
 * "bg-emerald-500" and padding of 5 units. Inside the `div`, it displays the text "Fetched" followed
 * by the number of minutes since the `dataUpdatedAt` timestamp using the `delta` function. The
 * `display` variable controls whether this content is displayed based on the `
 */
function Success(props: { dataUpdatedAt: number }) {
   const display = useAutoHide(1500)
   return (
      display && (
         <div className="bg-emerald-500 p-5">
            Fetched <span className="font-semibold">{delta(props.dataUpdatedAt)}</span> minutes ago.
         </div>
      )
   )
}

/**
 * The useAutoHide function in TypeScript React sets a timer to automatically hide a component after a
 * specified time.
 * @param {number} time - The `time` parameter in the `useAutoHide` function represents the duration in
 * milliseconds after which the `display` state will be set to `false`, hiding the component or element
 * that is using this custom hook.
 * @returns The `useAutoHide` function returns a boolean value indicating whether the display should be
 * visible or hidden based on the timer set in the `time` parameter.
 */
function useAutoHide(time: number) {
   const [display, setDisplay] = useState(true)
   const ref = useRef<NodeJS.Timeout>()

   useEffect(() => {
      ref.current = setInterval(() => setDisplay(false), time)
      return () => {
         if (ref.current !== undefined) clearInterval(ref.current)
      }
   }, [])

   return display
}
