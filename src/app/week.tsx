export default function Week({startOfWeek, deadlines}: {startOfWeek: Date, deadlines: any}){
  console.log(deadlines)
  const rows = []
  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  for (let i = 0; i < 7; i++){
    const dateOfDay = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
      rows.push(
          <div key={i} className="w-24 h-28 border">   
              <div className={`${dateOfDay.getDate() == 1 ? "w-16" : "w-8"} m-1 p-1 text-center rounded-full ${(dateOfDay.toLocaleDateString() == new Date().toLocaleDateString()) ? "bg-red-500" :  "bg-slate-300" }`}>
                {dateOfDay.getDate()} {dateOfDay.getDate() == 1 && months[dateOfDay.getMonth()]}
              </div>

              {/* dummy data */}
              {deadlines.map((x: any, j: number)=>(
              (new Date(x.due).toLocaleDateString() == dateOfDay.toLocaleDateString()) && <div key={j} className="w-5/6 m-1 bg-green-500 rounded-full px-1 mb-1 text-center">{x.name}</div>
              ))}
                        
          </div>
      )
    

  }
  return <div className="week flex pb-4">
      {rows} 
    </div>
}