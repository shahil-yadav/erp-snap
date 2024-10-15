"use client"
import { useTheme } from "@emotion/react"
import { useColorScheme } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"

function Sitemark() {
   // const { mode } = useTheme
   // console.log("🚀 ~ file: sitemark.tsx:8 ~ Sitemark ~ mode:", mode)
   const [url, setUrl] = useState("/sitemark-light.png")

   // useEffect(() => {
   //    if (mode === "dark") {
   //       setUrl("/sitemark-dark.png")
   //    }
   // }, [mode])

   return <Image alt="shahil yadav" src={url} width={100} height={21} />
}

export { Sitemark }
