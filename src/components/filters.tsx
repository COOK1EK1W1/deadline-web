"use client"
import { useCallback } from "react";
import { useDeadlines } from "./deadlines";
import { usePathname, useSearchParams } from "next/navigation";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import Link from "next/link";
import { useModalMutators } from "./modal/modalProvider";

export default function Filters(){
  const { programme } = useDeadlines();
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { openModalCourse } = useModalMutators();

  const curShow = searchParams.get("show")?.split(",") || programme?.courses.map(x=>x.code) || []

  function createShowList(currentCourses: string[], currentCourse: string): string[]{
    let a = [...currentCourses]
    if (a.includes(currentCourse)){
      a = a.filter((x) => x != currentCourse)
    }else{
      a.push(currentCourse)
    }

    return a
  }


  function createQueryShow(current: string): string{
    const curShowList = searchParams.get("show")

    let curShowListList: string[] = programme?.courses.map((x)=>x.code) || []
    if (curShowList != null){
      curShowListList = curShowList.split(",")
    }

    let newShowList = createShowList(curShowListList, current)

    if (newShowList.length == 0){
      return ""
    }else if (newShowList.length == programme?.courses.length){
      return ""
    }
    return createQueryString("show", newShowList.join(","))

  }


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return(
    <div className="flex gap-2 mb-2">
      {programme?.courses.map((x, i) =>{
        const shown = curShow.includes(x.code)
        console.log(createQueryShow(x.code))
        return <div className="rounded-full px-2 flex items-center" key={i}
        style={{ backgroundColor: `lch(64% ${shown ? 50 : 10} ${x.color} / .7)` }}
        ><span className="inline-block cursor-pointer" onMouseDown={()=>{openModalCourse(x.code)}}>{x.title}</span>
          <Link href={pathname + '?' + createQueryShow(x.code)}>
            {shown ? <FaRegEye className="inline-block mx-1" size={20}/> : <FaRegEyeSlash className="inline mx-1" size={20}/>}
          </Link>
        </div>
      })}

    </div>
  )
}
