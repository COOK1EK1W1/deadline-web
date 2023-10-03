import Calendar from "../components/calendar/calendar";

export default function Home() {
  
  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-2 pb-6 text-4xl dark:text-white">Deadline o matic</h1>
      <Calendar />
    </main>
  );
}