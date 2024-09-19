import { getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function isUndefined(arg?: string) {
    if (arg === undefined) throw new Error("Env variable is undefined, please check the .env file")
    return arg
}

const firebaseConfig = {
    apiKey: isUndefined(import.meta.env.VITE_FIREBASE_API_KEY),
    appId: isUndefined(import.meta.env.VITE_FIREBASE_APP_ID),
    authDomain: isUndefined(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    measurementId: isUndefined(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
    messagingSenderId: isUndefined(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    projectId: "erp-snap-1e3d8",
    storageBucket: "erp-snap-1e3d8.appspot.com",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { analytics }
