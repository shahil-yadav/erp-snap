import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "@/http";
import { LogIn } from "lucide-react";

function App() {
   return (
      <div className="h-svh px-10 flex items-center">
         <Login />
      </div>
   );
}

function Login() {
   return (
      <div className="w-full space-y-5">
         <h1 className="font-impact text-7xl">ERP</h1>
         <div className="space-y-2">
            <Input role="username" type="number" placeholder="Roll Number" />
            <Input role="password" type="number" placeholder="Password" />
         </div>
         <div className="flex w-full justify-end">
            <Button type="submit">
               <LogIn className="w-4 h-4 mr-2" />
               Login
            </Button>
         </div>
      </div>
   );
}

export default App;
