export default function Week({startOfWeek}: {startOfWeek: Date}){
  const rows = []
  for (let i = 0; i < 7; i++){
    const dateOfDay = new Date(startOfWeek.getTime() + 24*60*60*1000 * i)
      rows.push(
          <div className="w-24 h-24 border">
            {(dateOfDay.toLocaleDateString() != new Date().toLocaleDateString()) &&
              <div className="w-8 m-1 p-1 text-center rounded-full bg-slate-300">{dateOfDay.getDate()}</div>
            }
            {(dateOfDay.toLocaleDateString() == new Date().toLocaleDateString()) &&
              <div className="w-8 m-1 p-1 text-center rounded-full bg-red-500">{dateOfDay.getDate()}</div>
            }
          </div>
      )
    

  }
  return <div className="flex pb-4">
      {rows} 
    </div>
}