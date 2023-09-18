import Calendar from "./calendar"
import { Deadline } from "@prisma/client"
import prisma from "@/config/prisma"
import { addDays, isBefore, startOfDay } from "date-fns"



function getDeadlinesForDays(deadlines: Deadline[], startDate: Date, weeks: number) {
  const deadlinesOrdered: (Deadline | null)[][] = []
  console.log(deadlines)
  for (let i = 0; i < weeks * 7; i++) {
    //start of week date

    const dateOfDay = addDays(startDate, i)

    //array to hold deadlines for that day, in correct position from yesterday
    let day: (Deadline | null)[] = []
    //deadlines which have not been in the calendar before today
    const newDay: (Deadline | null)[] = []

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
        const yesterdayPos = deadlinesOrdered[i - 1].indexOf(deadline)

        if (yesterdayPos > -1) {
          //the deadline was on yesterday
          //check if the position yesterday is after the length of the array today
          if (yesterdayPos > day.length) {
            //extend the array with null
            while (yesterdayPos > (day.length)) {
              day.push(null)
            }
            //add the deadline to the array
            day.push(deadline)
          } else {
            // deadline can be inserted
            // day[yesterdayPos] = x
            day.splice(yesterdayPos, 1, deadline);
          }

        } else {
          // day.push(x)
          // add at next open pos
          newDay.push(deadline)

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
    deadlinesOrdered.push(result)
  }
  return deadlinesOrdered
}


export default async function Home() {
  const startDate = new Date(2023, 7, 28)
  const semesterStart = new Date(2023, 8, 11)
  const weeks = 17

  // 
  // console.log(deadlines)
  // const response = await fetch(`${process.env.LOCAL_ADDRESS}/api/deadlines`, {next:{tags: ['deadlines'], revalidate: 15000}})
  console.log("db query")
  const deadlines: Deadline[] = await prisma.deadline.findMany()
  const deadlinesForDays = getDeadlinesForDays(deadlines, startDate, weeks)


  return (
    <main className="flex flex-col items-center">
      <h1 className="py-6 text-4xl dark:text-white">Deadline o matic</h1>
      <Calendar startDate={startDate} semesterStart={semesterStart} weeks={weeks} deadlines={deadlinesForDays} />
    </main>
  )
}