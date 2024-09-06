import { useEffect } from "react"

export function useTheme() {
   useEffect(() => {
      function toggleTheme({ matches }: { matches: boolean }) {
         if (matches) {
            document.documentElement.classList.add("dark")
         } else {
            document.documentElement.classList.remove("dark")
         }
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", toggleTheme)
      return () => {
         window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", toggleTheme)
      }
   }, [])
}
