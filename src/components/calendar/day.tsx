

import DateIco from "@/components/date";
import { useModalMutators } from "@/components/modal/modalProvider";

import { useContext } from "react";
import { DeadlinesContext } from "@/components/deadlines/deadlines.context";
import Pill from "./pill";

export default function Day({dateOfDay, week, day}: {dateOfDay: Date, i: number, week: number, day: number}){
  const { openModal } = useModalMutators();
  const {deadlinesForDays} = useContext(DeadlinesContext);
  return <div
        className="w-full min-h-[7rem] border cursor-pointer dark:border-slate-700 pb-1"
        onClick={() => {
          openModal({ date: dateOfDay, deadlines: deadlinesForDays[week*7 + day] });
        }}
      >
        {/* dates */}
        <DateIco date={dateOfDay} showDay={true} />

        {/* deadlines */}
        {deadlinesForDays[week*7 + day].map((x: number | null) => (
          <Pill deadline={x} dateOfDay={dateOfDay}/> 
        ))}
      </div>
}