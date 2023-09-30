"use client"
import { Deadline } from "@prisma/client"

import DateIco from "./date"
import { addDays, isSameDay, isPast } from "date-fns"
import { useModalMutators } from '@/components/modal/modalProvider'


export default function Week({startOfWeek, deadlines}: {startOfWeek: Date, deadlines: (Deadline|null)[][]}){
  const { openModal } = useModalMutators()
  // console.log(deadlines)
  const rows = []
  for (let i = 0; i < 7; i++){
    const dateOfDay: Date = addDays(startOfWeek, i)
    // console.log("render")
    // console.log(deadlines)
    rows.push(
      <div key={i} className="w-full min-h-[7rem] border cursor-pointer dark:border-slate-700 pb-1" onClick={()=>{openModal({date: dateOfDay, deadlines: deadlines[i]})}}>   
              {/* dates */}
              <DateIco date={dateOfDay} showDay={true}/>

              {/* deadlines */}
              {deadlines[i].map((x: Deadline|null, j: number)=>(
                <span key={j}>{x && <div className={`hover:h-auto overflow-y-hidden h-6 mb-1 px-1 text-ellipsis text-center overflow-hidden
                                        ${(isSameDay(dateOfDay, new Date(x.due))) && "rounded-r-4xl w-5/6"} 
                                        ${(isSameDay(dateOfDay, new Date(x.start || x.due))) && "rounded-l-4xl ml-2"}`} 
                                        style={{backgroundColor:`lch(64% ${isPast(x.due)? "10": "50"} ${x.color} / .7)`}}>
                  {(i==0 || isSameDay(dateOfDay, new Date(x.due)) || isSameDay(dateOfDay, new Date(x.start|| x.due))) && x.name} &#8203;
                </div>}
                {(x==null) && <div className="h-6 mb-1">&#8203;</div>}</span>
              ))}
                        
          </div>
      )
    

  }
  return <div className="week flex pb-4">
      {rows} 
    </div>
}