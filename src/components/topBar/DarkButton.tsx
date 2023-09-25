"use client"

import Cookies from 'js-cookie'
import { useState } from 'react';
import { PiMoon, PiSun } from 'react-icons/pi'



export default function DarkButton() {
  const [dark, setDark] = useState(Cookies.get("darkMode") == "dark");
  function toggleDark(){
    const root = document.getElementsByTagName("html")[0]
    root.classList.toggle("dark")
    Cookies.set('darkMode', Cookies.get('darkMode') == "light" ? "dark" : "light")
    setDark(!dark)
  }
  return <div onClick={toggleDark} className="w-10 h-10 cursor-pointer">
    {!dark && <PiMoon className="w-full h-full"/>}
    {dark && <PiSun className="w-full h-full"/>}
  </div>
}