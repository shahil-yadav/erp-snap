import { Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import Box from "@mui/material/Box"
import Image from "next/image"
import Link from "next/link"

const Hero = () => (
   <div>
      <Typography align="center" variant="h2" gutterBottom>
         Lorem, ipsum dolor sit amet consectetur
      </Typography>
      <div className="flex justify-center">
         <Link href="/downloads">
            <Button color="primary" variant="contained" size="small">
               <GitHubIcon sx={{ mr: 2 }} />
               <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <Typography align="center" variant="caption">
                     Download now
                  </Typography>
                  <Typography variant="subtitle1">Powered by Github</Typography>
               </Box>
            </Button>
         </Link>
      </div>
      <Image className="bg-cover" alt="hero" src="/hero.png" width={1920} height={1080} />
   </div>
)

const Features = () => (
   <div className="bg-gray-300 py-10">
      <Container
         maxWidth="md"
         sx={{
            display: "flex",
            alignItems: "center",
         }}
      >
         <Box>
            <Typography variant="body1">
               Stay informed, always connected. Our app ensures you're never left in the dark, even when the internet
               isn't. With our lightning-fast data fetching and intelligent caching, you'll have access to the latest
               information, no matter where you are. No more worrying about spotty Wi-Fi or frustrating network outages.
               Experience the freedom of uninterrupted access, anytime, anywhere.
            </Typography>
         </Box>
         <Image className="" alt="offline-erp" src="/offline.png" width={300} height={600} />
      </Container>
   </div>
)

const Page = () => {
   return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
         <Hero />
         <Features />
      </Box>
   )
}

export default Page
