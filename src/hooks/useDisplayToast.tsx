import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import { useEffect } from "react";

export function useDisplayToast(dataUpdatedAt: number) {
  const { toast } = useToast();
  const isFetching = queryClient.isFetching();

  useEffect(() => {
    const duration = delta(dataUpdatedAt);
    if (!isFetching && duration > 10)
      toast({
        variant: "destructive",
        title: `Last updated  ${duration} minutes ago`,
        description: `Please refresh, ${new Date(dataUpdatedAt).toLocaleTimeString()}`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
  }, [isFetching, dataUpdatedAt, toast]);
}

export function delta(dataUpdatedAt: number) {
  return Math.round((new Date().getTime() - new Date(dataUpdatedAt).getTime()) / 1000 / 60);
}
