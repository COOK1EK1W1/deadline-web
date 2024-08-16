import Button from "@/components/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  async function navigate(formData: FormData){
    "use server"
    const code = formData.get("code")
    if (!code){
      return
    }
    redirect(`/${code}`)
  }

  return (
    <div>
      <form action={navigate} className="m-2 w-[400px] border-2 dark:border-slate-600 border-slate-300 w-3/4 rounded-2xl p-4 flex flex-col items-center mt-10">
          <input name="code" className="p-1 m-1 rounded px-2 dark:bg-slate-600 bg-white border-2 " placeholder="Enter programme code"/>
          <Button className="w-40" type="submit">Go</Button>
      </form>
      <div className="m-2 w-[400px] border-2 dark:border-slate-600 border-slate-300 w-3/4 rounded-2xl p-4 mt-20">
        <p>Not what you expected?</p>
        <p>The deadline o matic has expanded to now cover multiple courses, so no longer only serves the computer science course, but for convenience heres the direct link:</p>
        <div className="flex flex-col items-center w-full pt-2">
          <Link href={"/CS24-4"}>
            <Button className="w-60" type="submit">
              <h2>Computing Science Y4</h2>
            </Button>
        </Link>
        </div>
      </div>
    </div>
  );
}
