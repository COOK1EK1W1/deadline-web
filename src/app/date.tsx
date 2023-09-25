import { format, isToday } from "date-fns"

export default function DateIco({date, showDay}: {date: Date, showDay: boolean}){
  return <div className={`${date.getDate() == 1 && !showDay ? "w-24" : date.getDate() == 1 || !showDay ? "w-20": "w-8"} m-1 p-1 text-center rounded-full ${isToday(date) ? "bg-red-500" :  "hbg" }`}>
                {!showDay && format(date, "eee")} {date.getDate()} {date.getDate() == 1 && format(date, "MMM")}
  </div>
}