import { CapacitorCookies, CapacitorHttp, HttpResponse } from "@capacitor/core"

export async function loginIntoERP({
   argUsername,
   argPassword,
}: {
   argUsername?: string | number
   argPassword?: string
}) {
   if (!argUsername) throw new Error("Fill the roll number field")
   if (!argPassword) throw new Error("Fill the password field")
   const username = Number(argUsername)
   if (isNaN(username)) throw new Error("The roll number must be strictly in Numbers")
   const password = argPassword

   await CapacitorCookies.clearAllCookies()
   const response = await CapacitorHttp.post({
      url: "https://erp.psit.ac.in/Erp/Auth",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
         username,
         password,
      },
   })
   /** Compatible with ios and android */
   const headers = extractRefreshHeader(response)
   if (headers === undefined) throw new Error("The ERP server is unresponsive right now, please try again later")
   const isAuthenticated = Boolean(headers.match(/student/i))
   if (isAuthenticated) return { username, password }
   throw new Error("Wrong credentials, please check them again")
}

export function extractRefreshHeader(response: HttpResponse) {
   return response.headers["refresh"] || response.headers["Refresh"]
}
