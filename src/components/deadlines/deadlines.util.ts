import { Course, Deadline } from '@prisma/client';
import { addDays, isBefore, startOfDay, subDays } from "date-fns";
import { env } from '@/config/env/client';
import { ProgrammeDeadlines } from '@/types/programmeDeadline';


export function extractDeadlines(programmeDeadlines: ProgrammeDeadlines): (Deadline & Course)[]{
  let retDeadlines: (Deadline & Course)[]= []


  programmeDeadlines?.courses.map((course) =>{
    course.deadlines.map((deadline)=>{
      const {deadlines, ...rest} = course
      const b = {...deadline, ...rest}
      retDeadlines.push(b)
    })
  })
  return retDeadlines
}




const calendarStart = subDays(env.NEXT_PUBLIC_SEMESTER_START, 14)


export function getDeadlinesForAllDays(programmeDeadlines: ProgrammeDeadlines, currentShow: string[]): (number | null)[][] {


  const deadlinesOrdered: (number | null)[][] = [];

  const deadlines = extractDeadlines(programmeDeadlines)


  // for each day in calendar
  for (let i = 0; i < 14 * 7; i++) {

    const dateOfDay = addDays(calendarStart, i);

    //array to hold deadlines for that day, in correct position from yesterday
    let day: (number | null)[] = [];

    //deadlines which have not been in the calendar before today
    let newDay: (number | null)[] = [];

    //find deadlines which apply for today
    const relevantDeadlines = deadlines.filter((x) =>
      x.due &&
      !isBefore(startOfDay(x.due), startOfDay(dateOfDay)) &&
      !isBefore(startOfDay(dateOfDay), startOfDay(x.start || x.due))
      && currentShow.includes(x.code)
    );

    //loop through each deadline and check if its in the day
    for (let deadline of relevantDeadlines) {

      //ignore yesterday positions if it is new week
      if (i % 7 == 0) {
        newDay.push(deadline.id);

      } else {
        //find if and what the position of the deadline was yesterday
        const yesterdayPos = deadlinesOrdered[i - 1].indexOf(deadline.id);

        if (yesterdayPos > -1) {
          //the deadline was on yesterday
          //check if the position yesterday is after the length of the array today
          if (yesterdayPos > day.length) {
            //extend the array with null
            while (yesterdayPos > (day.length)) {
              day.push(null);
            }
            //add the deadline to the array
            day.push(deadline.id);
          } else {
            // deadline can be inserted
            // day[yesterdayPos] = x
            day.splice(yesterdayPos, 1, deadline.id);

          }

        } else {
          // day.push(x)
          // add at next open pos
          newDay.push(deadline.id);

        }
      }
    }

    //merge the newDay Deadlines, and the day deadlines
    const result: (number | null)[] = [];
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

export function transformDeadlinesToObject(programmeDeadlines: ProgrammeDeadlines) {
  // convert array of deadlines to array of tuples [deadline.id, deadline]
  // then convert array of tuples to object {deadline.id: deadline}
    const retDeadlines: (Deadline & Course)[]= []
    programmeDeadlines?.courses.map((course) =>{
      course.deadlines.map((deadline)=>{
        const {deadlines, ...rest} = course
        retDeadlines.push({...deadline, ...rest})
      })
    })
  //
  return Object.fromEntries(
    retDeadlines.map((deadline) => [deadline.id, deadline])
  );
}
