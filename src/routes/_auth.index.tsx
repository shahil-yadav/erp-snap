import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/")({
   component: Homepage,
})

function Homepage() {
   return (
      <main className="">
         <section className="mt-10 space-y-5">
            <div>
               <p>Good Morning,</p>
               <p>Hope you have a great day today</p>
            </div>
            <div className="flex justify-between">
               <div className="self-end space-y-5">
                  <div className="flex gap-2 items-center">
                     <a href="https://www.github.com/shahil-yadav/erp-snap">
                        <img className="w-10 h-8" src="images/github.png" alt="Github" />
                     </a>
                     <a href="https://www.linkedin.com/in/shahilyadav">
                        <img className="size-10" src="images/linkedin.png" alt="LinkedIn" />
                     </a>
                  </div>
                  <p className="text-xs">What do you want to do today ?</p>
               </div>
               <div className="">
                  <img className="w-48 h-36 aspect-video" src="images/hero.png" alt="Hero" />
               </div>
            </div>
         </section>

         <section className="grid mt-10 gap-2 sm:grid-cols-3 grid-cols-2">
            <Link to="/profile">
               <Tile heading="Hiee 👋" src="images/profile.png" footer={{ aux: "Explore", main: "Profile" }} />
            </Link>
            <Link to="/notifications">
               <Tile
                  heading="Notifications"
                  src="images/notifications.png"
                  footer={{ aux: "Listen to the latest", main: "Announcements" }}
               />
            </Link>
            <Link to="/time-table">
               <Tile
                  heading={
                     ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]
                  }
                  src="images/timetable.png"
                  footer={{ aux: "Explore", main: "Timetable" }}
               />
            </Link>
            <Link to="/attendance">
               <Tile heading="Attendance" src="images/attendance.png" footer={{ aux: "Explore", main: "Stats" }} />
            </Link>
         </section>
      </main>
   )
}

interface TileProps {
   heading: string
   src: string
   footer: {
      aux: string
      main: string
   }
}

function Tile({ heading, src, footer }: TileProps) {
   return (
      <Card className="bg-opacity-70 rounded-md bg-secondary">
         <CardHeader className="px-2 py-4">
            <CardTitle className="font-extrabold text-xl">{heading}</CardTitle>
         </CardHeader>
         <CardContent>
            <img className="size-20 mx-auto" src={src} alt="" />
         </CardContent>
         <CardFooter className="items-end flex-col">
            <p className="text-[10px]">{footer.aux}</p>
            <p className="text-sm font-extrabold">{footer.main}</p>
         </CardFooter>
      </Card>
   )
}
