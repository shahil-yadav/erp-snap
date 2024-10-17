"use client"

import { Author } from "@/app/downloads/components/author"
import { IRelease } from "@/lib/data/fetch-github-releases"
import { Download } from "@mui/icons-material"
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded"
import { Button, Chip, Divider, styled, Typography, useTheme } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import Link from "next/link"
import Markdown from "react-markdown"
import clsx from "clsx"

const WebkitOverflowSupportedTypography = styled(Typography)({
   display: "-webkit-box",
   WebkitBoxOrient: "vertical",
   WebkitLineClamp: 2,
   overflow: "hidden",
   textOverflow: "ellipsis",
})

const StyledTypography = styled(Typography)(({ theme }) => ({
   position: "relative",
   textDecoration: "none",
   "&:hover": { cursor: "pointer" },
   "& .arrow": {
      visibility: "hidden",
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
   },
   "&:hover .arrow": {
      visibility: "visible",
      opacity: 0.7,
   },
   "&:focus-visible": {
      outline: "3px solid",
      outlineColor: "hsla(210, 98%, 48%, 0.5)",
      outlineOffset: "3px",
      borderRadius: "8px",
   },
   "&::before": {
      content: '""',
      position: "absolute",
      width: 0,
      height: "1px",
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.text.primary,
      opacity: 0.3,
      transition: "width 0.3s ease, opacity 0.3s ease",
   },
   "&:hover::before": {
      width: "100%",
   },
}))

export function GridReleases({ releases }: { releases: IRelease[] }) {
   return (
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
         {releases.map((release, index) => (
            <Grid
               sx={(theme) => ({
                  "--Grid-borderWidth": "1px",
                  borderTop: `${theme.palette.divider} solid`,
                  pt: 2,
               })}
               key={index}
               size={{ xs: 12, md: 6 }}
            >
               <Release release={release} />
               {/* <Box sx={{ my: 2 }}>
                  <Divider />
               </Box> */}
            </Grid>
         ))}
      </Grid>
   )
}

export function Release({ release }: { release: IRelease }) {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
         }}
      >
         <div className="flex justify-between">
            <div>
               {release.isLatest ? (
                  <Chip color="success" size="medium" label="Latest" />
               ) : (
                  <Chip color="error" size="medium" label="Outdated" />
               )}
            </div>
            <Link href={release.downloadUrl}>
               <Button color={release.isLatest ? "primary" : "error"} variant="contained">
                  <Download className="mr-2" />
                  Download
               </Button>
            </Link>
         </div>
         <Author author={release.author} />

         <StyledTypography gutterBottom variant="h6" tabIndex={0}>
            {release.name}
            <NavigateNextRoundedIcon className="arrow" sx={{ fontSize: "1rem" }} />
         </StyledTypography>

         <div>
            <StyledMarkdown body={release.body} />
         </div>
      </Box>
   )
}

function StyledMarkdown(props: { body: string }) {
   const isDarkMode = useTheme().palette.mode === "dark"
   return <Markdown className={clsx(isDarkMode && "prose-invert", "prose")}>{props.body}</Markdown>
}
