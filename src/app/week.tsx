
function firstBeforeSecond(first: Date, second: Date) : boolean{
  const firstTime = new Date(first.toLocaleDateString()).getTime()
  const secondTime = new Date(second.toLocaleDateString()).getTime()
  return firstTime <= secondTime

}

function sameDay(first: Date, second: Date): boolean{
  const firstTime = first.toLocaleDateString()
  const secondTime = second.toLocaleDateString()
  return firstTime == secondTime
}

export default function Week({startOfWeek, deadlines}: {startOfWeek: Date, deadlines: Deadline[]}){
  // console.log(deadlines)
  const rows = []
  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const deadlinesOrdered: (Deadline|undefined)[][] = []
  for (let i = 0; i < 7; i++){
    const dateOfDay = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
    const day: (Deadline|undefined)[] = []
    for (let x of deadlines){
      //should be shown today
      if (firstBeforeSecond(dateOfDay, new Date(x.due)) && firstBeforeSecond(new Date(x.start || x.due), dateOfDay)){
        if (i == 0){
          day.push(x);
        }else{
          const yesterdayPos = deadlinesOrdered[i-1].indexOf(x)
          if (yesterdayPos > -1){
            day.splice(yesterdayPos, 0, x);
          }else{
            day.push(x)
            // add at next open pos
            
          }
        }

      }

    }
    // console.log(deadlinesOrdered)
    deadlinesOrdered.push(day)
  }
  for (let i = 0; i < 7; i++){
    const dateOfDay = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
    rows.push(
      <div key={i} className="w-24 h-28 border">   
              {/* dates */}
              <div className={`${dateOfDay.getDate() == 1 ? "w-16" : "w-8"} m-1 p-1 text-center rounded-full ${(dateOfDay.toLocaleDateString() == new Date().toLocaleDateString()) ? "bg-red-500" :  "bg-slate-300" }`}>
                {dateOfDay.getDate()} {dateOfDay.getDate() == 1 && months[dateOfDay.getMonth()]}
              </div>

              {/* deadlines */}
              {deadlinesOrdered[i].map((x: any, j: number)=>(
                <div key={j} className={`h-6 mb-1 bg-green-500 text-center 
                                        ${(sameDay(dateOfDay, new Date(x.due))) && "rounded-r-full w-5/6"} 
                                        ${(sameDay(dateOfDay, new Date(x.start || x.due))) && "rounded-l-full ml-2"}`}>
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