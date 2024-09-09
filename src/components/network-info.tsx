import { Spinner } from "@/components/spinner";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";

export function NetworkInfo(props: {
  dataUpdatedAt: number;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  const { toast } = useToast();
  const duration = delta(props.dataUpdatedAt);

  if (!props.isLoading && duration > 10)
    toast({
      variant: "destructive",
      title: `Last updated ${duration} minutes ago`,
      description: `Please refresh, ${new Date(props.dataUpdatedAt).toLocaleTimeString()}`,
      action: <ToastAction altText="close">Close</ToastAction>,
    });

  return (
    <div className="text-xs">
      {props.isLoading && (
        <div className="bg-yellow-500 p-5">
          Fetching the latest data from PSIT server <Spinner />
        </div>
      )}
      {props.isLoading === false && props.isSuccess && (
        <Success dataUpdatedAt={props.dataUpdatedAt} />
      )}
      {props.isLoading === false && props.isError && (
        <div className="bg-destructive p-5 text-destructive-foreground">{props.error?.message}</div>
      )}
    </div>
  );
}

/**
 * The Success component displays a success message if the data was fetched within the last 10 minutes.
 * @param props - The `Success` component takes a single prop `dataUpdatedAt`, which is a number
 * representing the timestamp of when the data was last updated.
 * @returns The `Success` component is returning a conditional JSX element based on the `display` state
 * and the comparison of the difference between the current time and the `dataUpdatedAt` timestamp. If
 * the `display` state is true and the difference is less than or equal to 10 minutes, it will render a
 * `<div>` element with a background color of emerald, displaying the message "Fetched X
 */
function Success(props: { dataUpdatedAt: number }) {
  const display = useAutoHide(1500);
  return (
    display &&
    delta(props.dataUpdatedAt) <= 10 && (
      <div className="bg-emerald-500 p-5">
        Fetched <span className="font-semibold">{delta(props.dataUpdatedAt)}</span> minutes ago.
      </div>
    )
  );
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
  const [display, setDisplay] = useState(true);
  const ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    ref.current = setInterval(() => setDisplay(false), time);
    return () => {
      if (ref.current !== undefined) clearInterval(ref.current);
    };
  }, []);

  return display;
}

function delta(dataUpdatedAt: number) {
  return Math.round((new Date().getTime() - new Date(dataUpdatedAt).getTime()) / 1000 / 60);
}
