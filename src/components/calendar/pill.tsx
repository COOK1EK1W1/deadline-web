import { Deadline } from "@prisma/client";
import { isPast, isSameDay } from "date-fns";

export default function Pill({deadline, dateOfDay} : {deadline: Deadline | null, dateOfDay: Date}){
  return <span>
    {deadline ? (
      <div
        className={`hover:h-auto overflow-y-hidden h-6 mb-1 px-1 text-ellipsis text-center overflow-hidden
                                ${
                                  isSameDay(
                                    dateOfDay,
                                    new Date(deadline.due)
                                  ) && "rounded-r-4xl w-5/6"
                                } 
                                ${
                                  isSameDay(
                                    dateOfDay,
                                    new Date(deadline.start || deadline.due)
                                  ) && "rounded-l-4xl ml-2"
                                }`}
        style={{
          backgroundColor: `lch(64% ${isPast(deadline.due) ? "10" : "50"} ${
            deadline.color
          } / .7)`,
        }}
      >
        {(
          isSameDay(dateOfDay, new Date(deadline.due)) ||
          isSameDay(dateOfDay, new Date(deadline.start || deadline.due))) &&
          deadline.name}{" "}
        &#8203;
      </div>
    ):(  //<- what a grumpy guy
      <div className="h-6 mb-1">&#8203;</div>
    )}
  </span>

}