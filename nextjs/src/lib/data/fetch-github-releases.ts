import { error } from "console"
import { z } from "zod"

export const schema = z.array(
   z.object({
      author: z.object({
         login: z.string(),
         avatar_url: z.string(),
      }),
      published_at: z.string(),
      tag_name: z.string(),
      name: z.string(),
      body: z.string(),
      id: z.number(),
      assets: z.array(
         z.object({
            browser_download_url: z.string(),
         })
      ),
   })
)

function getTimeDifference(data: string) {
   const ms = new Date().getTime() - new Date(data).getTime()
   const days = ms / (1000 * 60 * 60 * 24)
   const weeks = Math.floor(days / 7)
   return weeks
}

async function fetchAllGithubReleases() {
   try {
      const json = await fetch(process.env.VCS_RELEASE_URL).then((data) => data.json())

      const isParsed = schema.safeParse(json)
      if (!isParsed.success) {
         throw new Error(isParsed.error.message)
      }
      const releases = isParsed.data

      const data: IRelease[] = releases.map((release, index) => ({
         author: { name: release.author.login, image: release.author.avatar_url },
         body: release.body,
         downloadUrl: release.assets[0].browser_download_url,
         id: release.id,
         isLatest: index === 0,
         name: release.name,
         releasedDate: `${getTimeDifference(release.published_at)} weeks ago`,
         version: release.tag_name,
      }))

      return data
   } catch (error) {
      throw new Error("Could not fetch releases, please check for env variables")
   }
}

export interface IRelease {
   author: { name: string; image: string }
   body: string
   downloadUrl: string
   id: number
   isLatest: boolean
   name: string
   releasedDate: string
   version: string
}

export { fetchAllGithubReleases }
