"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useRef} from 'react'

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter()

  function navigate(){
    let value = inputRef.current?.value
    if (value){
      router.push(value)
    }
  }

  return (
    <div>
      <form onSubmit={navigate} className="m-2 md:w-[400px] border-2 border-slate-600 bg-slate-800 w-3/4 rounded-2xl p-4 flex flex-col items-center mt-10">
          <input className="p-1 m-1 rounded px-2 bg-slate-600" ref={inputRef} placeholder="Enter programme code"/>
          <button type="submit" className="w-40 m-1 p-1 bg-slate-600 rounded-full"onClick={navigate}>Go</button>
      </form>
      <div className="m-2 md:w-[400px] border-2 border-slate-600 bg-slate-800 w-3/4 rounded-2xl p-4 mt-20">
        <p>Not what you expected?</p>
        <p>The deadline o matic has expanded to now cover multiple courses, so no longer only serves the computer science course, but for convenience heres the direct link:</p>
        <div className="flex flex-col items-center w-full pt-2">
        <Link href={"/CS24-4"}>
          <div className="p-1 m-1 bg-slate-600 rounded-full text-center w-60">
            <h2>Computing Science Y4</h2>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
