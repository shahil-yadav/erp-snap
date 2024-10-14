import { DownloadButton } from "@/app/components/download-button"
import { IRelease } from "@/lib/data/fetch-github-releases"
import { Typography } from "@mui/material"
import Image from "next/image"

export function Hero({ release }: { release: IRelease }) {
   return (
      <div>
         <Typography align="center" variant="h2" gutterBottom>
            ERP SNAP
         </Typography>
         <div className="flex flex-col items-center">
            <DownloadButton downloadUrl={release.downloadUrl} />
            <Image className="md:hidden" alt="hero" src="/hero-mobile.png" width={300} height={700} />
         </div>
         <Image className="hidden md:block" alt="hero" src="/hero.png" width={1920} height={1080} />
      </div>
   )
}