'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (value: Theme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (value === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.setAttribute("data-theme", value);
    localStorage.setItem("neworld-theme", value);
  };

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("neworld-theme") as Theme | null) : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : false;
    const next = stored ?? (prefersDark ? "dark" : "light");
    applyTheme(next);
    setThemeState(next);
    setMounted(true);
  }, []);

  const setTheme = (value: Theme) => {
    setThemeState(value);
    applyTheme(value);
  };

  const toggle = useMemo(
    () => () => {
      setThemeState((current) => {
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        return next;
      });
    },
    []
  );

  const value = useMemo(() => ({ theme, toggle, setTheme, mounted }), [theme, toggle, setTheme, mounted]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
