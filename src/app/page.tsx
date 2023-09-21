import Calendar from "./calendar";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="py-6 text-4xl dark:text-white">Deadline o matic</h1>
      <Calendar />
    </main>
  );
}