import { isPast, isSameDay } from "date-fns";
import { DeadlinesContext } from "../deadlines/deadlines.context";
import { useContext } from "react";

export default function Pill({deadline, dateOfDay} : {deadline: number | null, dateOfDay: Date}){
  
  const {deadlines} = useContext(DeadlinesContext)
  const deadlineObj = deadlines.find((e)=>e.id == deadline)
  if (deadline !== null && deadlineObj !== undefined){
    
    return <span>
        <div
          className={`hover:h-auto overflow-y-hidden h-6 mb-1 px-1 text-ellipsis text-center overflow-hidden
                                  ${
                                    isSameDay(
                                      dateOfDay,
                                      new Date(deadlineObj.due)
                                    ) && "rounded-r-4xl w-5/6"
                                  } 
                                  ${
                                    isSameDay(
                                      dateOfDay,
                                      new Date(deadlineObj.start || deadlineObj.due)
                                    ) && "rounded-l-4xl ml-2"
                                  }`}
          style={{
            backgroundColor: `lch(64% ${isPast(deadlineObj.due) ? "10" : "50"} ${
              deadlineObj.color
            } / .7)`,
          }}
        >
          {(
            isSameDay(dateOfDay, new Date(deadlineObj.due)) ||
            isSameDay(dateOfDay, new Date(deadlineObj.start || deadlineObj.due))) &&
            deadlineObj.name}{" "}
          &#8203;
        </div>
    </span>


  }else{
    return <span>
        <div className="h-6 mb-1">&#8203;</div>
    </span>
      
  }
  
}