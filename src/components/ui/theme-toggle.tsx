"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[72px] h-[36px] bg-[#1E1E1E] rounded-full opacity-50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-between w-[45px] md:w-[72px] h-[23px] md:h-[36px] bg-secondary rounded-full p-1 cursor-pointer"
    >
      {/* Slider Background */}
      <div
        className={`absolute top-1 bottom-1 md:top-1 md:bottom-1 w-[15px] md:w-[28px] h-[15px] md:h-[28px] bg-primary-foreground/70 rounded-full transition-colors duration-3000 ease-in-out  ${
          isDark
            ? "translate-x-0 left-1.5"
            : "translate-x-[22px]  md:translate-x-[36px]"
        }`}
      />

      {/* Moon Icon (Dark Mode) */}
      <div className="w-1/2 flex items-center justify-center z-10">
        <Moon
          className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
            isDark ? "text-black" : "text-gray-400"
          }`}
        />
      </div>

      {/* Sun Icon (Light Mode) */}
      <div className="w-1/2 flex items-center justify-center z-10">
        <Sun
          className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-300 ${
            !isDark ? "text-white ml-1" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}
