import prisma from '@/config/prisma';
import { DeadlinesContext } from './deadlines.context';
import { getDeadlinesForDays } from './deadlines.util';
import { parseISO } from "date-fns";
import { useMemo } from 'react';

// TODO replace with config file that contains constants and env variables
if (!process.env.START_DATE || !process.env.SEMESTER_START || !process.env.TOTAL_WEEKS) {
  throw new Error("env variables missing");
}
const startDate = parseISO(process.env.START_DATE);
const weeks = Number(process.env.TOTAL_WEEKS);

type Props = {
  children: React.ReactNode;
};

export default async function DeadlinesProvider({ children }: Props) {
  const deadlines = await useMemo(async () => {
    const prismaDeadlines = await prisma.deadline.findMany();
    return getDeadlinesForDays(prismaDeadlines, startDate, weeks);
  }, []);

  return (
    <DeadlinesContext.Provider value={deadlines}>
      {children}
    </DeadlinesContext.Provider>
  );
}
