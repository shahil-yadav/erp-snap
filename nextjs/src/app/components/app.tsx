"use client"

import { Footer } from "@/app/components/footer"
import { Frame } from "@/app/components/frame"
import { Navbar } from "@/app/components/navbar"
import { getTheme } from "@/theme/getTheme"
import { Container, createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material"
import React from "react"

export function App(props: Readonly<{ children: React.ReactNode }>) {
   const [mode, setMode] = React.useState<PaletteMode>("light")
   const [showCustomTheme, setShowCustomTheme] = React.useState(true)
   const customTheme = createTheme(getTheme(mode))
   const defaultTheme = createTheme({ palette: { mode } })

   // This code only runs on the client side, to determine the system color preference
   React.useEffect(() => {
      // Check if there is a preferred mode in localStorage
      const savedMode = localStorage.getItem("themeMode") as PaletteMode | null
      if (savedMode) {
         setMode(savedMode)
      } else {
         // If no preference is found, it uses system preference
         const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
         setMode(systemPrefersDark ? "dark" : "light")
      }
   }, [])

   const toggleColorMode = () => {
      const newMode = mode === "dark" ? "light" : "dark"
      setMode(newMode)
      localStorage.setItem("themeMode", newMode) // Save the selected mode to localStorage
   }

   const toggleCustomTheme = () => {
      setShowCustomTheme((prev) => !prev)
   }

   return (
      <Frame
         toggleCustomTheme={toggleCustomTheme}
         showCustomTheme={showCustomTheme}
         mode={mode}
         toggleColorMode={toggleColorMode}
      >
         <ThemeProvider theme={showCustomTheme ? customTheme : defaultTheme}>
            <CssBaseline enableColorScheme />
            <Navbar mode={mode} toggleColorMode={toggleColorMode} />
            <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", gap: 4, mb: 10 }}>
               {props.children}
               <Footer />
            </Container>
         </ThemeProvider>
      </Frame>
   )
}
