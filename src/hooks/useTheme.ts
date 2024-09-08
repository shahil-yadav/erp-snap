import { useEffect, useState } from "react";

export function useTheme() {
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      document.documentElement.classList.add("dark");

    function toggleTheme({ matches }: { matches: boolean }) {
      if (matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", toggleTheme);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", toggleTheme);
    };
  }, []);
}

export function useDetectDarkTheme() {
  const [isDark, setIsDark] = useState(false);
  const selector = "(prefers-color-scheme: dark)";

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) setIsDark(true);

    function toggleTheme({ matches }: { matches: boolean }) {
      if (matches) setIsDark(true);
      else setIsDark(false);
    }

    window.matchMedia(selector).addEventListener("change", toggleTheme);
    return () => {
      window.matchMedia(selector).removeEventListener("change", toggleTheme);
    };
  }, []);

  return isDark;
}
