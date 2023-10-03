

import DateIco from "@/components/date";
import { useModalMutators } from "@/components/modal/modalProvider";

import { Deadline } from "@prisma/client";
import { isSameDay, isPast } from "date-fns";

export default function Day({dateOfDay, i, deadlines}: {dateOfDay: Date, i: number, deadlines: (Deadline | null)[][]}){
  const { openModal } = useModalMutators();
  return <div
        className="w-full min-h-[7rem] border cursor-pointer dark:border-slate-700 pb-1"
        onClick={() => {
          openModal({ date: dateOfDay, deadlines: deadlines[i] });
        }}
      >
        {/* dates */}
        <DateIco date={dateOfDay} showDay={true} />

        {/* deadlines */}
        {deadlines[i].map((x: Deadline | null, j: number) => (
          <span key={j}>
            {x && (
              <div
                className={`hover:h-auto overflow-y-hidden h-6 mb-1 px-1 text-ellipsis text-center overflow-hidden
                                        ${
                                          isSameDay(
                                            dateOfDay,
                                            new Date(x.due)
                                          ) && "rounded-r-4xl w-5/6"
                                        } 
                                        ${
                                          isSameDay(
                                            dateOfDay,
                                            new Date(x.start || x.due)
                                          ) && "rounded-l-4xl ml-2"
                                        }`}
                style={{
                  backgroundColor: `lch(64% ${isPast(x.due) ? "10" : "50"} ${
                    x.color
                  } / .7)`,
                }}
              >
                {(i == 0 ||
                  isSameDay(dateOfDay, new Date(x.due)) ||
                  isSameDay(dateOfDay, new Date(x.start || x.due))) &&
                  x.name}{" "}
                &#8203;
              </div>
            )}
            {x == null && <div className="h-6 mb-1">&#8203;</div>}
          </span>
        ))}
      </div>
}