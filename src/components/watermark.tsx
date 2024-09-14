import { useDetectDarkTheme } from "@/hooks/use-theme";

export function Watermark() {
  const isDark = useDetectDarkTheme();
  return (
    <div className="flex justify-center space-x-2 text-center">
      <span>Maintained by</span>
      <div className="relative">
        <img
          src={isDark ? "images/dev-light.png" : "images/dev.png"}
          className="w-32"
          alt="Shahil Yadav"
        />
        <img
          src={isDark ? "images/line-dark.png" : "images/line.png"}
          className="absolute w-32 opacity-80"
          alt="Shahil Yadav"
        />
      </div>
    </div>
  );
}
