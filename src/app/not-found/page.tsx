import Link from "next/link";

export default function NotFound(){
  return (
    <div className="m-2 w-[400px] border-2 border-slate-600 bg-slate-800 w-3/4 rounded-2xl p-4 mt-20 flex flex-col items-center">
      <h1>Sorry no programme found :(</h1>
      <Link className="p-1 m-1 bg-slate-600 rounded-full text-center w-60 mt-4" href={"/"}> Back to main page</Link>
    </div>

  )

}

