import cn from "@/util/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({  children, className,...props}: ButtonHTMLAttributes<HTMLButtonElement> & {children: ReactNode, className?: string}){
  return (
    <button {...props} className={cn("m-1 p-1 dark:bg-slate-600 bg-slate-300 rounded-full hover:shadow-xl duration-300", className)}>
      {children}
    </button>
  )

}
