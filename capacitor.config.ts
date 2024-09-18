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
    },
    server: {
        url: "http://192.168.1.33:4321",
        cleartext: true,
    },
}

export default config
