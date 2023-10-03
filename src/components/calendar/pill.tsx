import { isPast, isSameDay } from "date-fns";
import { DeadlinesContext } from "../deadlines/deadlines.context";
import { useContext } from "react";
import { useDeadlines } from '../deadlines/deadlines.context';
import cn from '@/util/cn';

type Props = {
  id: number | null,
  dateOfDay: Date;
};

export default function Pill({ id, dateOfDay }: Props) {
  const { getDeadlineById } = useDeadlines();

  if (!id) {
    return (
      <span>
        <div className="h-6 mb-1">&#8203;</div>
      </span>
    );
  }

  const deadline = getDeadlineById(id);
  const isDeadlineStart = isSameDay(dateOfDay, new Date(deadline.start || deadline.due));
  const isDeadlineEnd = isSameDay(dateOfDay, new Date(deadline.due));

  return (
    <span>
      <div
        className={cn('hover:h-auto overflow-y-hidden h-6 mb-1 px-1 text-ellipsis text-center overflow-hidden', isDeadlineStart && 'rounded-l-4xl ml-2', isDeadlineEnd && 'rounded-r-4xl w-5/6')}
        style={{ backgroundColor: `lch(64% ${isPast(deadline.due) ? "10" : "50"} ${deadline.color} / .7)` }}
      >
        {(isDeadlineEnd || isDeadlineStart) && deadline.name}
        {" "}&#8203;
      </div>
    </span>
  );
}