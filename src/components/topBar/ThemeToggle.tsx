"use client"
import React, { useEffect, useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi';

export default function ThemeToggle() {

  const isDarkInitial = typeof(window) !== "undefined" && localStorage.getItem("theme") === "true";
  const [isDark, setIsDark] = useState(isDarkInitial);
  

  function toggleTheme() {
    const newVal = !isDark;
    setIsDark(newVal);

    // set in local storage
    localStorage.setItem("theme", String(newVal));

    const root = document.getElementsByTagName("html")[0];
    if (newVal) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    if (isDarkInitial) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkInitial]);

  return (
    <div onClick={toggleTheme} className="w-10 h-10 cursor-pointer">
      {isDark && <PiSun className="w-full h-full" />}
      {!isDark && <PiMoon className="w-full h-full" />}
    </div>
  );
}