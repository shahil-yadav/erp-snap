import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"

export async function fetchLatestRelease() {
   const json = await fetchAllGithubReleases()
   return json[0]
}
