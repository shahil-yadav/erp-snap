/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "com.shahilyadav",
    appName: "erp-snap",
    webDir: "dist",
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
        CapacitorCookies: {
            enabled: true,
        },
        SplashScreen: {
            androidScaleType: "CENTER_CROP",
        },
    },
    // server: {
    //     url: "http://192.168.1.33:4321",
    //     cleartext: true,
    // },
}

export default config
