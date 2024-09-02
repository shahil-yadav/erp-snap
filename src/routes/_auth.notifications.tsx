import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CapacitorHttp } from "@capacitor/core"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import * as cheerio from "cheerio"
import { Bell } from "lucide-react"

export const Route = createFileRoute("/_auth/notifications")({
   component: Notifications,
   loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(options()),
})

function Notifications() {
   const query = useSuspenseQuery(options())
   const { notifications } = query.data

   return (
      <Card>
         <CardHeader>
            <Link className="w-fit" to="/">
               Back
            </Link>
            <CardTitle className="text-xl">Notifications</CardTitle>
         </CardHeader>
         <CardContent>
            <ScrollArea className="h-[50vh]">
               {notifications.map((notification) => (
                  <>
                     <Link to={notification.link} className="flex items-center ">
                        <Bell className="w-4 flex-shrink-0 h-4 mr-5 aspect-square" />
                        <p>{notification.label}</p>
                     </Link>
                     <Separator className="my-3" />
                  </>
               ))}
            </ScrollArea>
         </CardContent>
      </Card>
   )
}

function options() {
   return queryOptions({
      queryKey: ["notifications"],
      queryFn: async () => {
         const response = await CapacitorHttp.get({
            url: "https://erp.psit.ac.in/Student",
         })
         const $ = cheerio.load(response.data)
         const data = $.extract({
            notifications: [
               {
                  selector: "#style-3 > table > tbody > tr",
                  value: {
                     link: {
                        selector: "a",
                        value: "href",
                     },
                     label: "a",
                  },
               },
            ],
         })
         return data
      },
   })
}
