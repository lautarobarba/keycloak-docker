"use client";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { SunIcon } from "@/components/icons/SunIcon";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="inline p-1">
      <button onClick={toggleTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};
