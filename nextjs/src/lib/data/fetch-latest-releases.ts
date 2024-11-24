import {fetchAllGithubReleases, IRelease, releaseZodSchema, schema} from "@/lib/data/fetch-github-releases"


export async function fetchLatestRelease() {
    try {
        const json = await fetch(process.env.VCS_LATEST_RELEASE_URL).then((data) => data.json())
        const isParsed = releaseZodSchema.safeParse(json)
        if (!isParsed.success)
            throw new Error(isParsed.error.message)

        const release = isParsed.data

        return {
            version: release.tag_name,
            downloadUrl: release.assets[0].browser_download_url,
        }
    } catch (error) {
        console.error(error)
        throw new Error("Cannot load the latest release")
    }
}
