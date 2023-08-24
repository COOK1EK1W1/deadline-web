import Calendar from "./calendar"

export default function Home() {
  const startDate = new Date(2023, 7, 10)


  return (
    <main className="grid justify-center">
      <h1 className="py-6 text-4xl">Deadline o matic</h1>
      <Calendar startDate={startDate}/> 
    </main>
  )
}

