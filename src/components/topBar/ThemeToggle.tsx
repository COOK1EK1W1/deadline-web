"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <div onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 cursor-pointer">
      {resolvedTheme === "dark" ? (<PiSun className="w-full h-full" />) : (<PiMoon className="w-full h-full" />)}
    </div>
  );
}