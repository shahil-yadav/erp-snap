"use client"

import { useTheme } from "@mui/material"
import Image from "next/image"
import * as React from "react"

function Sitemark() {
   const [url, setUrl] = React.useState("/sitemark-light.png")
   const mode = useTheme().palette.mode

   React.useEffect(() => {
      if (mode === "dark") setUrl("/sitemark-dark.png")
      else setUrl("/sitemark-light.png")
   }, [mode])

   return <Image alt="shahil yadav" src={url} width={100} height={21} />
}

export { Sitemark }
