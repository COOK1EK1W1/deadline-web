import { env } from '@/config/env/client';

import { addDays, differenceInCalendarWeeks, format } from "date-fns";
import Day from "./day";

export default function Week({
  startOfWeek,
  week,
}: {
  startOfWeek: Date;
  week: number
}) {

  const rows = [];
  for (let i = 0; i < 7; i++) {
    const dateOfDay: Date = addDays(startOfWeek, i);
    rows.push(
      <Day dateOfDay={dateOfDay} i={i} key={i} week={week} day={i}></Day>
    );
  }
  return <div>
    {env.NEXT_PUBLIC_SEMESTER_START.getTime() <= startOfWeek.getTime() &&
      <div>
        <div className="pl-3">
          Week {differenceInCalendarWeeks(startOfWeek, env.NEXT_PUBLIC_SEMESTER_START) + 1} - Beginning {format(startOfWeek, 'd/M')}
        </div>

      </div>
    }
    <div className="week flex pb-4">
      {rows}
    </div>
  </div>
    
}
