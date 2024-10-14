import { Navbar } from "@/components/navbar"
import theme from "@/theme"
import { Container } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import * as React from "react"
import "./globals.css"

export const metadata: Metadata = {
   title: {
      template: "%s | Erp Snap",
      default: "Erp Snap",
   },
   // description: "",
   metadataBase: new URL("https://erp-snap.vercel.app"),
}

const font = Roboto({
   weight: ["300", "400", "500", "700"],
   subsets: ["latin"],
   display: "swap",
   variable: "--font-roboto",
})

export default function RootLayout(props: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={font.variable}>
            <AppRouterCacheProvider>
               <App>{props.children}</App>
            </AppRouterCacheProvider>
            <Analytics />
         </body>
      </html>
   )
}

const App = (props: { children: React.ReactNode }) => (
   <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="lg" component="main" sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}>
         {props.children}
      </Container>
   </ThemeProvider>
)
