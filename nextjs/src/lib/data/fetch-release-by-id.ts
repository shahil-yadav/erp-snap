import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"

export async function fetchReleaseById(arg: string) {
   const id = Number(arg)
   if (isNaN(id)) throw new Error("Please do not mess with URL")
   const json = await fetchAllGithubReleases()
   const release = json.find((release) => release.id === id)
   return release
}
