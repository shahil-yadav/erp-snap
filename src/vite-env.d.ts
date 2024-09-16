/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_PASSWORD: string
    readonly VITE_APP_USERNAME: string
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_MEASUREMENT_ID: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
