import { Network } from "@capacitor/network"
import { ReactNode } from "@tanstack/react-router"
import { createContext, useContext, useEffect, useState } from "react"

interface State {
    connected: boolean
}

const defaultValue: State = {
    connected: true,
}

const Context = createContext(defaultValue)

function ConnectionStatusProvider({ children }: { children: ReactNode }) {
    const [connected, setConnected] = useState(true)

    useEffect(() => {
        Network.getStatus().then(({ connected }) => setConnected(connected))
        const unsub = Network.addListener("networkStatusChange", ({ connected }) => {
            setConnected(connected)
        })
        return () => {
            unsub.then((data) => data.remove())
        }
    }, [])

    const value = { connected }
    return <Context.Provider value={value}>{children}</Context.Provider>
}

const useConnectionStatusContext = () => useContext(Context)

export { useConnectionStatusContext, ConnectionStatusProvider }
