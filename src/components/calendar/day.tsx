"use client";
import DateIco from "@/components/date";
import { useModalMutators } from "@/components/modal/modalProvider";
import { useContext } from "react";
import { DeadlinesContext } from "@/components/deadlines/deadlines.context";
import Pill from "./pill";
import { useDeadlinesContext } from '@/components/deadlines/deadlines.context';

export default function Day({ dateOfDay, week, day }: { dateOfDay: Date, i: number, week: number, day: number; }) {
  const { openModal } = useModalMutators();
  const { getDeadlinesForDay } = useDeadlinesContext();
  const deadlines = getDeadlinesForDay({ week, day });

  return (
    <div
      className="w-full min-h-[7rem] border cursor-pointer dark:border-slate-700 pb-1"
      onClick={() => openModal({ date: dateOfDay, deadlines })}
    >
      {/* dates */}
      <DateIco date={dateOfDay} showDay={true} />

      {/* deadlines */}
      {deadlines.map((id, index) => (
        <Pill key={index} id={id} dateOfDay={dateOfDay} />
      ))}
    </div>
  );
}