/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "com.shahilyadav",
    appName: "erp-snap",
    plugins: {
        CapacitorCookies: {
            enabled: true,
        },
        CapacitorHttp: {
            enabled: true,
        },

        SplashScreen: {
            androidScaleType: "CENTER_CROP",
        },
    },
    // server: {
    //     cleartext: true,
    //     url: "http://192.168.1.34:4321",
    // },
    webDir: "dist",
}

export default config
