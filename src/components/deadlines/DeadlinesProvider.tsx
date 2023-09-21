"use client";
// import prisma from '@/config/prisma';
import { DeadlinesContext } from './deadlines.context';
import { getDeadlinesForDays } from './deadlines.util';
// import { parseISO } from "date-fns";
import { useMemo } from 'react';

type Props = {
  children: React.ReactNode;
  deadlines: any;
  startDate: any;
  weeks: any;
};

export default function DeadlinesProvider({ children, deadlines, startDate, weeks }: Props) {
  const deadlinesValue = useMemo(() => {
    console.log("render DeadlinesProvider @ getDeadlinesForDays");
    return getDeadlinesForDays(deadlines, startDate, weeks);
  }, [deadlines, startDate, weeks]);

  return (
    <DeadlinesContext.Provider value={deadlinesValue}>
      {children}
    </DeadlinesContext.Provider>
  );
}
