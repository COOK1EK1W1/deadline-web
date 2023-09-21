import Calendar from "./calendar";
import { Deadline } from "@prisma/client";
import prisma from "@/config/prisma";
import { parseISO } from "date-fns";
import { DeadlinesProvider } from '@/components/deadlines';
import "@/config/config";

export default async function Home() {
  //check if env variables exist
  if (!process.env.START_DATE || !process.env.SEMESTER_START || !process.env.TOTAL_WEEKS) {
    throw new Error("env variables missing");
  }

  //the start of the calendar
  const startDate = parseISO(process.env.START_DATE);
  //the start of the numbered weeks
  const semesterStart = parseISO(process.env.SEMESTER_START);
  const weeks = Number(process.env.TOTAL_WEEKS);

  //retrieve deadlines from database
  const deadlines: Deadline[] = await prisma.deadline.findMany();

  return (
    <DeadlinesProvider deadlines={deadlines} startDate={startDate} weeks={weeks}>
      <main className="flex flex-col items-center">
        <h1 className="py-6 text-4xl dark:text-white">Deadline o matic</h1>
        <Calendar startDate={startDate} semesterStart={semesterStart} weeks={weeks} />
      </main>
    </DeadlinesProvider>
  );
}