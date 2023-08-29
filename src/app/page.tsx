import Calendar from "./calendar"

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Home() {
  const startDate = new Date(2023, 7, 17)

  // 
  // console.log(deadlines)
  const deadlines = await fetch(`${process.env.LOCAL_ADDRESS}/api/deadlines`, {next: {revalidate: 7200}})
  const stuff: DBResponse = (await deadlines.json())
  const {fields, rows} = stuff


  return (
    <main className="grid justify-center">
      <h1 className="py-6 text-4xl">Deadline o matic</h1>
      <Calendar startDate={startDate} deadlines={rows}/> 
    </main>
  )
}