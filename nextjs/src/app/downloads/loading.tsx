import { Box, CircularProgress } from "@mui/material"
import React from "react"

function Loading() {
   return (
      <Box
         sx={{
            width: "full",
            height: "full",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <CircularProgress size={100} />
      </Box>
   )
}

export default Loading
