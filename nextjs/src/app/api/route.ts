import { z } from "zod"

const schema = z.array(
   z.object({
      author: z.object({
         login: z.string(),
         avatar_url: z.string(),
      }),
      published_at: z.string(),
      tag_name: z.string(),
      body: z.string(),
      assets: z.array(
         z.object({
            browser_download_url: z.string(),
         })
      ),
   })
)

function getTimeDifference(data: string) {
   const ms = new Date() - new Date(data)
   const days = ms / (1000 * 60 * 60 * 24)
   const weeks = Math.floor(days / 7)
   return weeks
}

export async function GET() {
   const json = await fetch(process.env.VCS_RELEASE_URL).then((data) => data.json())

   const isParsed = schema.safeParse(json)
   if (!isParsed.success) {
      return Response.json({ error: isParsed.error })
   }
   const releases = isParsed.data

   const data = releases.map((release, index) => ({
      author: { name: release.author.login, image: release.author.avatar_url },
      releasedDate: `${getTimeDifference(release.published_at)} weeks ago`,
      isLatest: index === 0,
      version: release.tag_name,
      body: release.body,
      downloadUrl: release.assets[0].browser_download_url,
   }))

   return Response.json(data)
}
