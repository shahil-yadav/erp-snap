import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/login";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { FormEvent, useState } from "react";
import { loginIntoERP } from "./services/loginIntoERP";

const useCredentials = () => ({
  username: import.meta.env.VITE_APP_USERNAME,
  password: import.meta.env.VITE_APP_PASSWORD,
});

export function SignIn() {
  const [password, setPassword] = useState<string>(useCredentials().password || "");
  const [username, setUsername] = useState<string>(useCredentials().username || "");
  const { mutate, isError, isPending } = useAuthenticateMutation();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    mutate({ argUsername: username, argPassword: password });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg space-y-5 px-10">
      <h2 className="text-lg font-semibold">Please login to continue, </h2>
      <div className="space-y-2">
        <Input
          className={cn("h-14 text-lg", isError && "border-red-500")}
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Roll Number"
          role="username"
          type="text"
        />

        <Password isError={isError} password={password} setPassword={setPassword} />
      </div>
      <div className="flex w-full justify-end">
        <Button
          className={cn(isPending && "disabled:bg-emerald-500 disabled:text-white")}
          disabled={isPending}
          type="submit"
          variant="outline"
        >
          {isPending ? (
            "Signing in ..."
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Password(props: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isError: boolean;
}) {
  const [hide, setHide] = useState(true);
  return (
    <div
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "h-14 text-lg",
        props.isError && "border-red-500",
      )}
    >
      <input
        className="h-full w-full bg-background"
        defaultValue={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        placeholder="Password"
        role="password"
        type={hide ? "password" : "text"}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setHide((prev) => !prev);
        }}
      >
        {hide ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </button>
    </div>
  );
}

function useAuthenticateMutation() {
  const router = useRouter();
  const { toast } = useToast();

  const auth = Route.useRouteContext({
    select: ({ auth }) => auth,
  });

  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginIntoERP,
    onSuccess: (data) => {
      auth.login(data.username, data.password);
      router.invalidate();
      toast({
        title: "Login successfull",
        // description: "",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    },

    onError: (err) => {
      toast({
        variant: "destructive",
        title: err.message,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    },
  });
}
