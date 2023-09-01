import Calendar from "./calendar"

export const revalidate = 15000
export const dynamic = 'force-dynamic'

function firstBeforeSecond(first: Date, second: Date) : boolean{
  const firstTime = new Date(first.toLocaleDateString()).getTime()
  const secondTime = new Date(second.toLocaleDateString()).getTime()
  return firstTime <= secondTime

}

function sameDay(first: Date, second: Date): boolean{
  const firstTime = first.toLocaleDateString()
  const secondTime = second.toLocaleDateString()
  return firstTime == secondTime
}

function getDeadlinesForDays(deadlines: Deadline[], startDate: Date, weeks: number){
  const deadlinesOrdered: (Deadline|undefined)[][] = []
  for (let i = 0; i < weeks*12; i++){
    const dateOfDay = new Date(startDate.getTime() + 24*60*60*1000 * i)
    const day: (Deadline|undefined)[] = []
    for (let x of deadlines){
      //should be shown today
      if (firstBeforeSecond(dateOfDay, new Date(x.due)) && firstBeforeSecond(new Date(x.start || x.due), dateOfDay)){
        if (i == 0){
          day.push(x);
        }else{
          const yesterdayPos = deadlinesOrdered[i-1].indexOf(x)
          if (yesterdayPos > -1){
            day.splice(yesterdayPos, 0, x);
          }else{
            day.push(x)
            // add at next open pos
            
          }
        }

      }

    }
    // console.log(deadlinesOrdered)
    deadlinesOrdered.push(day)
  }
  return deadlinesOrdered

}

export default async function Home() {
  const startDate = new Date(2023, 7, 14)
  const weeks = 12

  // 
  // console.log(deadlines)
  const deadlines = await fetch(`${process.env.LOCAL_ADDRESS}/api/deadlines`, {next: {revalidate: 15000, tags: ['deadlines']}})
  const stuff: DBResponse = (await deadlines.json())
  const {fields, rows} = stuff
  const deadlinesForDays = getDeadlinesForDays(rows, startDate, weeks)


  return (
    <main className="flex flex-col items-center">
      <h1 className="py-6 text-4xl">Deadline o matic</h1>
      <Calendar startDate={startDate} deadlines={deadlinesForDays}/> 
    </main>
  )
}