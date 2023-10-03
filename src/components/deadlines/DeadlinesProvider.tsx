"use client";
import { DeadlinesContext } from './deadlines.context';
import { getDeadlinesForAllDays, transformDeadlinesToObject } from './deadlines.util';
import { useMemo, useCallback } from 'react';
import { Deadline } from '@prisma/client';
import { WeekDay } from "./types";

type Props = {
  children: React.ReactNode;
  deadlines: Deadline[];
};

export default function DeadlinesProvider({ children, deadlines }: Props) {
  const deadlinesForAllDays = useMemo(() => getDeadlinesForAllDays(deadlines), [deadlines]);
  const deadlinesObject = useMemo(() => transformDeadlinesToObject(deadlines), [deadlines]);

  const getDeadlinesForDay = useCallback(({ week, day }: WeekDay) => {
    return deadlinesForAllDays[(week * 7) + day];
  }, [deadlinesForAllDays]);

  const getDeadlineById = useCallback((id: number) => {
    return deadlinesObject[id];
  }, [deadlinesObject]);

  const values = useMemo(() => ({
    getDeadlinesForDay, getDeadlineById
  }), [getDeadlinesForDay, getDeadlineById]);

  return (
    <DeadlinesContext.Provider value={values}>
      {children}
    </DeadlinesContext.Provider>
  );
}
