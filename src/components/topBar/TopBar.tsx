import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { PiCode, PiDiscordLogo, PiGithubLogo } from "react-icons/pi";

export default function TopBar(){
  return <div className="flex p-2 float items-center justify-between">
    <div className="hbg flex rounded-4xl py-1 px-2">
      <Link href="https://github.com/COOK1EK1W1/" aria-label="Ciaran's Github" className="w-10 h-10"><PiGithubLogo className="h-full w-full"/></Link>
      <span className="w-1 h-10 bg-gray-400 mx-2 rounded"></span>
      <Link href="https://github.com/COOK1EK1W1/Deadline-o-matic" aria-label="Discord bot github" className="w-10 h-10"><PiDiscordLogo className="h-full w-full"/></Link>
      <Link href="https://github.com/COOK1EK1W1/deadline-web" aria-label="website github" className="w-10 h-10"><PiCode className="h-full w-full"/></Link>
    </div>
    <ThemeToggle></ThemeToggle>
  </div>
}