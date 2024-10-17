import { GitHub, LinkedIn } from "@mui/icons-material"
import { Box, Divider } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Link from "next/link"
// import SitemarkIcon from "./SitemarkIcon"

export function Footer() {
   return (
      <Box>
         <Divider sx={{ my: 2 }} />
         <Stack justifyContent="end" direction="row" spacing={1}>
            <Link href="https://www.github.com/shahil-yadav/erp-snap">
               <IconButton>
                  <GitHub />
               </IconButton>
            </Link>
            <Link href="https://www.linkedin.com/in/shahilyadav/">
               <IconButton>
                  <LinkedIn />
               </IconButton>
            </Link>
         </Stack>
      </Box>
   )
}
