import { App } from "@capacitor/app"
import { useEffect, useState } from "react"

function useGetAppVersion() {
    const [version, setVersion] = useState<string>()

    useEffect(() => {
        App.getInfo().then((data) => setVersion(data.version))
    }, [])

    return version
}

export { useGetAppVersion }
