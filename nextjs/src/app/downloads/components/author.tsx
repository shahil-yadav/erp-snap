import { IRelease } from "@/lib/data/fetch-github-releases"
import { Avatar, Box, Typography } from "@mui/material"

export function Author({ author }: { author: IRelease["author"] }) {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
         }}
      >
         <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
            <Avatar alt="shahil" src={author.image} sx={{ width: 24, height: 24 }} />
            <Typography sx={{ fontWeight: "700" }} variant="caption">
               {author.name}
            </Typography>
            <Typography variant="caption">released this 3 weeks ago</Typography>
         </Box>
         <Typography variant="caption">July 14, 2021</Typography>
      </Box>
   )
}
