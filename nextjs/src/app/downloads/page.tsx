import { GridReleases } from "@/app/downloads/components/grid"
import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"
import Typography from "@mui/material/Typography"
import { Metadata } from "next"

export const metadata: Metadata = {
   title: "Downloads",
}

export default async function Page() {
   const releases = await fetchAllGithubReleases()
   return (
      <div>
         <Typography variant="h2" gutterBottom>
            App Versions
         </Typography>
         <GridReleases releases={releases} />
      </div>
   )
}
