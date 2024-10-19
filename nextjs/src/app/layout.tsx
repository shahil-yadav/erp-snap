import { App } from "@/app/components/app"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import * as React from "react"
import "./globals.css"

export const metadata: Metadata = {
   title: {
      template: "%s - Erp Snap",
      default: "Erp Snap",
   },
   description:
      "Your academic hub, at your fingertips. Check your timetable, attendance, and profile with ease on our user-friendly ERP dashboard.",
   metadataBase: new URL("https://erp-snap.vercel.app"),
}

const font = Inter({
   weight: ["300", "400", "500", "700"],
   subsets: ["latin"],
   display: "swap",
   variable: "--font-primary",
})

export default function RootLayout(props: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={font.variable}>
            <AppRouterCacheProvider>
               <App>{props.children}</App>
            </AppRouterCacheProvider>
            <Analytics />
            <SpeedInsights />
         </body>
      </html>
   )
}

