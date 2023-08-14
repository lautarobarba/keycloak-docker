"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  loading: boolean;
  setTheme: (newValue: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  loading: false,
  setTheme: () => { },
  toggleTheme: () => { },
});

type ThemeProviderProps = {
  children?: ReactNode;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState<boolean>(true);

  const toggleTheme = () => {
    const newValue: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(newValue);
    localStorage.setItem("theme", newValue);
  };

  const changeTheme = (newValue: "light" | "dark") => {
    setTheme(newValue);
    localStorage.setItem("theme", newValue);
  };

  useEffect(() => {
    const lastTheme = localStorage.getItem("theme");
    if (lastTheme && (lastTheme === "light" || lastTheme === "dark"))
      setTheme(lastTheme);
    setLoading(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, loading, setTheme: changeTheme, toggleTheme }}
    >
      <main className={theme}>{children}</main>
    </ThemeContext.Provider>
  );
};
