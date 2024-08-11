import { env } from '@/config/env/client';
import { subDays, addDays, differenceInCalendarWeeks, format } from "date-fns";
import Day from "./day";

type Props = {
  week: number;
};

const START_DATE = subDays(env.NEXT_PUBLIC_SEMESTER_START, 14);
const SEMESTER_START = env.NEXT_PUBLIC_SEMESTER_START;
const NUM_DAYS = 7;
const numDaysIndexes = Array.from(Array(NUM_DAYS).keys());

export default function Week({ week }: Props) {
  const startOfWeek = addDays(START_DATE, 7 * week);
  const isWeekInSemester = SEMESTER_START.getTime() <= startOfWeek.getTime();
  const weekNumberInSemester = differenceInCalendarWeeks(startOfWeek, SEMESTER_START) + 1;

  return (
    <div>
      {isWeekInSemester && (
        <div className="pl-3">
          Week {weekNumberInSemester} - Beginning {format(startOfWeek, 'd/M')}
        </div>
      )}

      <div className="week flex pb-4">
        {numDaysIndexes.map((numDay) => (
          <Day
            key={numDay}
            day={numDay}
            week={week}
          />
        ))}
      </div>
    </div>
  );
}
