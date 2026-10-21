import { createContext, use, useCallback, useEffect, useState } from "react";

import { setThemeServerFn } from "@/server/functions/theme";

import type { PropsWithChildren } from "react";
import type { Theme } from "@/server/functions/theme";

interface ThemeContext {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeProvider = ({
  children,
  theme: initialTheme,
}: PropsWithChildren<{ theme: Theme }>) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((val: Theme) => {
    document.documentElement.className = val;
    setThemeState(val);
    setThemeServerFn({ data: val });
  }, []);

  // global shortcut: press "t" to toggle light/dark
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.toLowerCase() !== "t") return;

      const target = event.target as HTMLElement | null;

      // ignore typing contexts so the shortcut never hijacks real input
      if (
        target?.isContentEditable ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
        return;

      setTheme(theme === "light" ? "dark" : "light");
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [theme, setTheme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const val = use(ThemeContext);

  if (!val) throw new Error("`useTheme` called outside of `<ThemeProvider />`");

  return val;
};

export default ThemeProvider;
