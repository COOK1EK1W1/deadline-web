export default function DateIco({date, showDay}: {date: Date, showDay: boolean}){
  const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  return <div className={`${date.getDate() == 1 && !showDay ? "w-24" : date.getDate() == 1 || !showDay ? "w-20": "w-8"} m-1 p-1 text-center rounded-full ${(date.toLocaleDateString() == new Date().toLocaleDateString()) ? "bg-red-500" :  "bg-slate-300 dark:bg-slate-600" }`}>
                {!showDay && days[date.getDay()]} {date.getDate()} {date.getDate() == 1 && months[date.getMonth()]}
  </div>
}