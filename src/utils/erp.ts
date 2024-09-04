import { loginIntoERP } from "@/components/auth/services/loginIntoERP"
import { CapacitorHttp } from "@capacitor/core"

export const erp = {
   get: async function (url: string, username?: number, password?: string) {
      let html = await CapacitorHttp.get({
         url,
      })

      if (!html.data) {
         await loginIntoERP({ argPassword: password, argUsername: username })
         html = await CapacitorHttp.get({
            url,
         })
      }

      return html
   },
}
