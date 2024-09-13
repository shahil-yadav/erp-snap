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
