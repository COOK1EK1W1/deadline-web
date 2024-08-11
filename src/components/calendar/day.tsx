"use client";
import DateIco from "@/components/date";
import { useModalMutators } from "@/components/modal/modalProvider";
import Pill from "./pill";
import { useDeadlines } from '@/components/deadlines/deadlines.context';
import { env } from '@/config/env/client';
import { addDays, subDays } from "date-fns";

type Props = {
  day: number;
  week: number,
};

const START_DATE = subDays(env.NEXT_PUBLIC_SEMESTER_START, 14)

export default function Day({ day, week }: Props) {
  const { openModal } = useModalMutators();
  const { getDeadlinesForDay } = useDeadlines();
  const deadlines = getDeadlinesForDay({ week, day });
  const dateOfDay = addDays(START_DATE, (week * 7) + day);

  return (
    <div
      className="w-full min-h-[7rem] border cursor-pointer dark:border-slate-700 pb-1"
      onClick={() => openModal({ date: dateOfDay, deadlines })}
    >
      {/* dates */}
      <DateIco date={dateOfDay} showDay={true} />

      {/* deadlines */}
      {deadlines.map((id, index) => {
        console.log(id)
        return <Pill key={index} deadlineId={id} dateOfDay={dateOfDay} />
      })}
    </div>
  );
}
