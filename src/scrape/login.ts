import { CapacitorCookies, CapacitorHttp } from "@capacitor/core";

/**
 * This TypeScript function logs in with a username and password, clears cookies, makes a POST request
 * to a specific URL, and checks if the login was successful based on the response headers.
 * @param {number} username - The `username` parameter in the `loginWithUsernameAndPassword` function
 * is expected to be a number. It is used as part of the data sent in the POST request to the specified
 * URL for authentication.
 * @param {string} password - The `password` parameter in the `loginWithUsernameAndPassword` function
 * is a string type. It is the password that the user provides for authentication.
 * @returns The function `loginWithUsernameAndPassword` will return a boolean value. It will return
 * `true` if the login request is successful and the user is redirected to the home page (based on the
 * presence of "refresh" header containing "student" in the response headers). If the login request fails
 * or the user is not redirected to the home page, it will return `false`.
 */
async function loginWithUsernameAndPassword(username: number, password: string) {
   console.log(username, password);
   await CapacitorCookies.clearAllCookies();
   const response = await CapacitorHttp.post({
      url: "https://erp.psit.ac.in/Erp/Auth",
      // url: " https://httpbin.org/post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
         username,
         password,
      },
   });
   console.log("Status => ", response.status);
   console.log(response.data);

   const headers = response.headers["refresh"];
   console.log("🚀 ~ file: login.ts:29 ~ loginWithUsernameAndPassword ~ headers:", headers);
   if (headers !== undefined) {
      return Boolean(headers.match(/student/i));
   }
   throw new Error("Parsing the request [header] failed");
}

export { loginWithUsernameAndPassword };
