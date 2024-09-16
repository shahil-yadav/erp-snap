import { App } from "@capacitor/app"
import { Dialog } from "@capacitor/dialog"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { compareVersions } from "compare-versions"

function useReleaseUpdate() {
    const { data } = useSuspenseQuery(options())
    const appVersion = useGetAppVersion()

    useEffect(() => {
        if (!data.latestVersion || !appVersion) return

        async function showDialog() {
            const { value } = await Dialog.confirm({
                title: `Please upgrade from ${appVersion} to ${data.latestVersion}`,
                message: data.description,
            })
            if (value === true) window.open(data.url)
        }

        // if (data.latestVersion !== appVersion)
        if (compareVersions(appVersion, data.latestVersion) === -1) showDialog()
    }, [appVersion, data.latestVersion, data.description, data.url])
}

function useGetAppVersion() {
    const [version, setVersion] = useState<string>()

    useEffect(() => {
        App.getInfo().then((data) => setVersion(data.version))
        return () => {}
    }, [])

    return version
}

function options() {
    const githubUrl = getReleaseUrl()
    return queryOptions({
        queryKey: ["release"],
        queryFn: async () => {
            const latestRelease = await fetch(githubUrl)
                .then((res) => res.json())
                .then((data) => data.at(0))

            const description = (latestRelease.body as string).replace(/#|\*/g, "")
            const url: string = latestRelease.html_url
            const latestVersion: string = latestRelease.name
            return { latestVersion, description, url }
        },
    })
}

function getReleaseUrl() {
    const url = import.meta.env.VITE_VCS_RELEASE_URL
    if (url === undefined) throw new Error("Set the environment variable")
    return url
}

export { useReleaseUpdate }
