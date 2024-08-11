"use client";
import { DeadlinesContext } from './deadlines.context';
import { getDeadlinesForAllDays, transformDeadlinesToObject } from './deadlines.util';
import { useMemo, useCallback } from 'react';
import { WeekDay } from "./types";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';

type Props = {
  children: React.ReactNode;
  deadlines: ProgrammeDeadlines;
};

export default function DeadlinesProvider({ children, deadlines }: Props) {
  const deadlinesForAllDays = getDeadlinesForAllDays(deadlines)
  const deadlinesObject = transformDeadlinesToObject(deadlines)

  const getDeadlinesForDay = useCallback(({ week, day }: WeekDay) => {
    return deadlinesForAllDays[(week * 7) + day];
  }, [deadlinesForAllDays]);

  const getDeadlineById = useCallback((id: number) => {
    return deadlinesObject[id]
  }, [deadlinesObject]);

  return (
    <DeadlinesContext.Provider value={{programme: deadlines, getDeadlineById, getDeadlinesForDay}}>
      {children}
    </DeadlinesContext.Provider>
  );
}
