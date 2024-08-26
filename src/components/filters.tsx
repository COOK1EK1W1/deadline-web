"use client"
import { useCallback, useState } from "react";
import { IoIosArrowDown, IoMdInformationCircleOutline } from "react-icons/io";
import { useDeadlines } from "./deadlines";
import { usePathname, useSearchParams } from "next/navigation";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa"
import Link from "next/link";
import { useModalMutators } from "./modal/modalProvider";

export default function Filters(){
  const [open, setOpen] = useState(false)
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
    <div className="flex flex-col items-center">
      <button onMouseDown={()=>setOpen(!open)}>
        <h2 className="text-xl">{programme?.title}<IoIosArrowDown className={`duration-500 inline ${open ? "rotate-0": "rotate-180"}`}/></h2>
      </button>
      <div className={`flex gap-2 my-3 flex-col duration-500 overflow-hidden ${open ? "max-h-96": "max-h-0" } items-center`}>
        <button className="rounded-full px-2 hbg w-20 justify-center flex items-center" onMouseDown={()=>openModalCourse("")}>
          <IoMdInformationCircleOutline className="inline-block mr-1" /> info
        </button>
        <div className="flex gap-2 flex-col">
          {programme?.courses.map((course, i) =>{
            const shown = curShow.includes(course.code)
            return (
              <div className="rounded-full px-2 flex items-center justify-between flex" key={i} style={{ backgroundColor: `lch(64% ${shown ? 50 : 10} ${course.color} / .7)` }}>
                <span className="inline-block cursor-pointer" onMouseDown={()=>{openModalCourse(course.code)}}>{course.title}</span>
                <Link href={pathname + '?' + createQueryShow(course.code)}>
                  {shown ? <FaRegEye className="inline-block mx-1" size={20}/> : <FaRegEyeSlash className="inline mx-1" size={20}/>}
                </Link>
              </div>
            )
          })}
          {curShow.length !== programme?.courses.length ? <span>bookmark this with <kbd>ctrl</kbd> + <kbd>D</kbd></span> : null}

        </div>
      </div>
    </div> 
  )
}
