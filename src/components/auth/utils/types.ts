export type Auth = {
   login: (username: number, password: string) => void
   logout: () => void
   synchroniseStorage: VoidFunction
   status: "loggedIn" | "loggedOut"
   username?: number
   password?: string
}
