import { Deadline } from '@prisma/client';
import { addDays, isBefore, startOfDay } from "date-fns";
import { env } from '@/config/env/client';

export function getDeadlinesForDays(
  deadlines: Deadline[]
): (Deadline | null)[][] {
  const deadlinesOrdered: (Deadline | null)[][] = [];
  // console.log(deadlines)
  for (let i = 0; i < env.NEXT_PUBLIC_TOTAL_WEEKS * 7; i++) {
    //start of week date

    const dateOfDay = addDays(env.NEXT_PUBLIC_START_DATE, i);

    //array to hold deadlines for that day, in correct position from yesterday
    let day: (Deadline | null)[] = [];
    //deadlines which have not been in the calendar before today
    const newDay: (Deadline | null)[] = [];

    //find deadlines which apply for today
    const relevantDeadlines = deadlines.filter((x) =>
      !isBefore(startOfDay(x.due), startOfDay(dateOfDay)) &&
      !isBefore(startOfDay(dateOfDay), startOfDay(x.start || x.due))
    );

    //loop through each deadline and check if its in the day
    for (let deadline of relevantDeadlines) {

      //ignore yesterday positions if it is new week
      if (i % 7 == 0) {
        newDay.push(deadline);

      } else {
        //find if and what the position of the deadline was yesterday
        const yesterdayPos = deadlinesOrdered[i - 1].indexOf(deadline);

        if (yesterdayPos > -1) {
          //the deadline was on yesterday
          //check if the position yesterday is after the length of the array today
          if (yesterdayPos > day.length) {
            //extend the array with null
            while (yesterdayPos > (day.length)) {
              day.push(null);
            }
            //add the deadline to the array
            day.push(deadline);
          } else {
            // deadline can be inserted
            // day[yesterdayPos] = x
            day.splice(yesterdayPos, 1, deadline);

          }

        } else {
          // day.push(x)
          // add at next open pos
          newDay.push(deadline);

        }
      }
    }

    //merge the newDay Deadlines, and the day deadlines
    const result: (Deadline | null)[] = [];
    let newDayIndex = 0;

    //loop through the day, and fill in undefined spots with newDay deadlines
    for (const item of day) {
      if (item === null) {
        if (newDayIndex < newDay.length) {
          result.push(newDay[newDayIndex]);
          newDayIndex++;
        } else {
          result.push(null);
        }
      } else {
        result.push(item);
      }
    }

    // If there are remaining deadlines in newDay, add them to the end
    while (newDayIndex < newDay.length) {
      result.push(newDay[newDayIndex]);
      newDayIndex++;
    }

    deadlinesOrdered.push(result);
  }

  return deadlinesOrdered;
}