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
      className="relative flex items-center justify-between w-[72px] h-[36px] bg-[#1E1E1E] rounded-full p-1 cursor-pointer"
    >
      {/* Slider Background */}
      <div
        className={`absolute top-1 bottom-1 w-[28px] h-[28px] bg-white rounded-full transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-0" : "translate-x-[36px]"
        }`}
      />

      {/* Moon Icon (Dark Mode) */}
      <div className="w-1/2 flex items-center justify-center z-10">
        <Moon
          className={`w-4 h-4 transition-colors duration-300 ${
            isDark ? "text-black" : "text-gray-400"
          }`}
        />
      </div>

      {/* Sun Icon (Light Mode) */}
      <div className="w-1/2 flex items-center justify-center z-10">
        <Sun
          className={`w-4 h-4 transition-colors duration-300 ${
            !isDark ? "text-black" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}
