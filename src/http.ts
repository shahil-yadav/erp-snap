import { CapacitorHttp, HttpOptions, HttpResponse } from "@capacitor/core";

/** GET Request through Plugin */
const doGet = async (options: HttpOptions) => {
   /*const options: HttpOptions = {
      url: "",
      // header:
      // params:
   };*/

   return await CapacitorHttp.get(options);
};

/** POST Request through Plugin */
const doPost = async (options: HttpOptions) => {
   /*const options: HttpOptions = {
      url: "",
      // header:
      // data: {foo : 'bar'}
   };*/

   return await CapacitorHttp.post(options);
};

export const getPHPCookie = async () => {
   const response = await CapacitorHttp.post({
      url: "https://erp.psit.ac.in/Erp/Auth",
      data: {
         username: 2201641720092,
         password: 12345678,
      },
   });
};
