"use client"

import { SnackbarAlertSuccess, useSnackbar } from "@/app/components/styled-snackbar"
import GitHubIcon from "@mui/icons-material/GitHub"
import { Button, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Link from "next/link"

export function DownloadButton({ downloadUrl }: { downloadUrl: string }) {
   const { handleClick, handleClose, open } = useSnackbar()
   return (
      <Link href={downloadUrl}>
         <Button onClick={handleClick} color="primary" variant="contained" size="small">
            <GitHubIcon sx={{ mr: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
               <Typography variant="caption">Download now</Typography>
               <Typography variant="subtitle1">Powered by Github</Typography>
            </Box>
         </Button>
         <SnackbarAlertSuccess handleClose={handleClose} open={open} label="Downloading started" />
      </Link>
   )
}
