"use client"

import DateIco from "./date"

function sameDay(first: Date, second: Date): boolean{
  const firstTime = first.toLocaleDateString()
  const secondTime = second.toLocaleDateString()
  return firstTime == secondTime
}

export default function Week({startOfWeek, deadlines, modal}: {startOfWeek: Date, deadlines: (Deadline|undefined)[][], modal: CallableFunction}){
  // console.log(deadlines)
  const rows = []
  for (let i = 0; i < 7; i++){
    const dateOfDay: Date = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
    rows.push(
      <div key={i} className="w-full h-28 border cursor-pointer" onClick={()=>{modal({date: dateOfDay, deadlines: deadlines[i]})}}>   
              {/* dates */}
              <DateIco date={dateOfDay} showDay={true}/>

              {/* deadlines */}
              {deadlines[i].map((x: any, j: number)=>(
                <div key={j} className={`cursor-pointer h-6 mb-1 bg-green-500 text-center 
                                        ${(sameDay(dateOfDay, new Date(x.due))) && "rounded-r-full w-5/6"} 
                                        ${(sameDay(dateOfDay, new Date(x.start || x.due))) && "rounded-l-full ml-2"}`} >
                  {(i==0 || sameDay(dateOfDay, new Date(x.due)) || sameDay(dateOfDay, new Date(x.start|| x.due))) && x.name}
                </div>
              ))}
                        
          </div>
      )
    

  }
  return <div className="week flex pb-4">
      {rows} 
    </div>
}