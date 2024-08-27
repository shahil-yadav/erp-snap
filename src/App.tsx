import { Attendance } from "@/components/attendance";
import { Notifications } from "@/components/notifications";

function App() {
   return (
      <div className="m-5 h-svh space-y-2">
         <Attendance oaa={12} present={100} absent={80} />
         <Notifications />
      </div>
   );
}

export default App;
