"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import {
  ThemeToggleButton,
  type ThemeToggleButtonProps,
  useThemeTransition,
} from "@/components/theme-toggle-button";

export function ThemeToggle({
  variant = "circle-blur",
  start = "top-right",
  showLabel = false,
  className,
}: Pick<
  ThemeToggleButtonProps,
  "variant" | "start" | "showLabel" | "className"
>) {
  const { resolvedTheme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, [resolvedTheme]);

  const handleToggle = () => {
    const next = currentTheme === "light" ? "dark" : "light";
    startTransition(() => setTheme(next));
    setCurrentTheme(next);
  };

  return (
    <ThemeToggleButton
      theme={currentTheme}
      variant={variant}
      start={start}
      showLabel={showLabel}
      className={className}
      onClick={handleToggle}
    />
  );
}
