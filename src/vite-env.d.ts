/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_APP_USERNAME: string
   readonly VITE_APP_PASSWORD: string
}

interface ImportMeta {
   readonly env: ImportMetaEnv
}
