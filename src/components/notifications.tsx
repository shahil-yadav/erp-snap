import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

export function Notifications() {
   const notifications = Array(100).fill(
      "AC repair work in Boys' hostelsAC repair work in Boys' hostelsAC repair work in Boys' hostels"
   );
   return (
      <Card className="">
         <CardHeader>
            <CardTitle className="text-xl">Notifications</CardTitle>
         </CardHeader>
         <CardContent>
            <ScrollArea className="h-[50vh]">
               {notifications.map((notification) => (
                  <>
                     <div className="flex gap-5 items-start">
                        <Bell className="w-8 aspect-square" /> <p>{notification}</p>
                     </div>
                     <Separator className="my-3" />
                  </>
               ))}
            </ScrollArea>
         </CardContent>
      </Card>
   );
}
