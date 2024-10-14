import { GridReleases } from "@/app/downloads/components/grid"
import { fetchAllGithubReleases } from "@/lib/data/fetch-github-releases"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"

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
