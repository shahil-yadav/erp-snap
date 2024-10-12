import { extractRefreshHeader, loginIntoERP } from "@/components/auth/services/loginIntoERP"
import { CapacitorHttp } from "@capacitor/core"

export const erp = {
    get: async function (url: string, username?: number, password?: string) {
        let response = await CapacitorHttp.get({
            url,
        })

        const refresh = extractRefreshHeader(response)

        if (refresh === "0;url=https://erp.psit.ac.in/") {
            await loginIntoERP({ argPassword: password, argUsername: username })
            response = await CapacitorHttp.get({
                url,
            })
        }

        return response
    },
}
