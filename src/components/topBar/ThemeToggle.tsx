"use client"

import Cookies from 'js-cookie'
import { useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi'



export default function ThemeToggle() {
  const [dark, setDark] = useState(Cookies.get("theme") == "dark");
  function toggleDark(){
    const root = document.getElementsByTagName("html")[0]
    root.classList.toggle("dark")
    Cookies.set('theme', Cookies.get('theme') == "light" ? "dark" : "light")
    setDark(!dark)
  }
  return <div onClick={toggleDark} className="w-10 h-10 cursor-pointer">
    {dark && <PiSun className="w-full h-full"/>}
    {!dark && <PiMoon className="w-full h-full"/>}
  </div>
}