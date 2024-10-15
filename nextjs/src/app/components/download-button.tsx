"use client"

import { SnackbarAlertSuccess, useSnackbar } from "@/app/components/styled-snackbar"
import { GitHub } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Link from "next/link"

export function DownloadButton({ downloadUrl, version }: { downloadUrl: string; version: string }) {
   const { handleClick, handleClose, open } = useSnackbar()
   return (
      <Link href={downloadUrl}>
         <Button sx={{ py: 4 }} onClick={handleClick} variant="contained">
            <GitHub sx={{ fontSize: "40px", mr: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
               <Typography>Download {version}</Typography>
               <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Powered by Github</Typography>
            </Box>
         </Button>
         <SnackbarAlertSuccess handleClose={handleClose} open={open} label="Downloading started" />
      </Link>
   )
}
