"use client"

import * as React from "react"
import { ClassName } from "@/types/classname"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import Button from "@/components/ui/button"

export function ThemeToggle({ className }: ClassName) {
  const { setTheme, theme } = useTheme()

  console.log("ThemeToggle rendered, current theme:", theme)

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    console.log("Changing theme from", theme, "to", newTheme)
    setTheme(newTheme)
  }

  return (
    <Button
      theme="ghost"
      size="sm"
      onClick={handleThemeChange}
      className={`h-9 w-9 p-0 relative ${className}`}
    >
      <Sun className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-auto h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
