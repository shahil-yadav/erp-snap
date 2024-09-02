import * as ls from "local-storage"
import { Auth } from "./types"

export const auth: Auth = {
   status: ls.get<Auth["status"]>("status") || "loggedOut",
   username: ls.get("username"),
   password: ls.get("password"),

   login(username, password) {
      this.status = "loggedIn"
      this.username = username
      this.password = password
      this.synchroniseStorage()
   },

   logout() {
      this.status = "loggedOut"
      this.username = undefined
      this.password = undefined
      this.synchroniseStorage()
   },

   synchroniseStorage() {
      ls.set("password", this.password)
      ls.set("status", this.status)
      ls.set("username", this.username)
   },
}
