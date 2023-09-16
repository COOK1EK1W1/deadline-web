import Calendar from "./calendar"
import { Deadline } from "@prisma/client"
import prisma from "@/config/prisma"


function firstBeforeSecond(first: Date, second: Date) : boolean{
  const firstTime = new Date(first.toLocaleDateString()).getTime()
  const secondTime = new Date(second.toLocaleDateString()).getTime()
  return firstTime <= secondTime
}

function getDeadlinesForDays(deadlines: Deadline[], startDate: Date, weeks: number){
  const deadlinesOrdered: (Deadline|null)[][] = []
  console.log(deadlines)
  for (let i = 0; i < weeks*12; i++){
    //start of week date
    const dateOfDay = new Date(startDate.getTime() + 24*60*60*1000 * i)

    //array to hold deadlines for that day
    let day: (Deadline|null)[] = []
    const newDay: (Deadline|null)[] = []
  
    //loop through each deadline and check if its in the day
    for (let x of deadlines){

      //should be shown today
      if (firstBeforeSecond(dateOfDay, new Date(x.due)) && firstBeforeSecond(new Date(x.start || x.due), dateOfDay)){
        
        //ignore yesterday positions if it is new week
        if (i % 7 ==  0){
          newDay.push(x);

        }else{
          //find if and what the position of the deadline was yesterday
          const yesterdayPos = deadlinesOrdered[i-1].indexOf(x)

          if (yesterdayPos > -1){
            //the deadline was on yesterday
            //check if the position yesterday is after the length of the array today
            if (yesterdayPos > day.length){
              //extend the array with null
              while (yesterdayPos > (day.length)) {
                day.push(null)
              }
              //add the deadline to the array
              day.push(x)
            }else{
              // deadline can be inserted
              // day[yesterdayPos] = x
              day.splice(yesterdayPos, 1, x);
            }
            
          }else{
            // day.push(x)
            // add at next open pos
            newDay.push(x)
            
          }
        }

      }

    }
    const result: (Deadline | null)[] = [];

    let newDayIndex = 0;
  
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
  const startDate = new Date(2023, 7, 28, 2,) //sneeky way to get around daylight savings
  const semesterStart = new Date(2023, 8, 11, 2)
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
      <Calendar startDate={startDate} semesterStart={semesterStart} weeks={weeks} deadlines={deadlinesForDays}/> 
    </main>
  )
}