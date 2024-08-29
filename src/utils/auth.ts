const auth: Auth = {
   status: "logout",

   login(username, password) {
      this.status = "login";
      this.username = username;
      this.password = password;
   },

   logout() {
      this.status = "logout";
      this.username = undefined;
      this.password = undefined;
   },
};

type Auth = {
   login: (username: number, password: string) => void;
   logout: () => void;
   status: "login" | "logout";
   username?: number;
   password?: string;
};

export { auth, type Auth };
