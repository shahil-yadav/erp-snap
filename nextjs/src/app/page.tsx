import { Hero } from "@/app/components/hero"
import { Services } from "@/app/components/services"
import { GithubReleasesTable } from "@/app/components/table"
import { fetchLatestRelease } from "@/lib/data/fetch-latest-releases"
import Box from "@mui/material/Box"

async function Page() {
   const release = await fetchLatestRelease()
   return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
         <Hero release={release} />
         <Services />
         <GithubReleasesTable />
      </Box>
   )
}

export default Page
