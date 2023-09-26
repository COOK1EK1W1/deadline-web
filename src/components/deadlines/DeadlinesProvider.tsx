"use client";
import { DeadlinesContext } from './deadlines.context';
import { getDeadlinesForDays } from './deadlines.util';
import { useMemo } from 'react';
import { Deadline } from '@prisma/client';

type Props = {
  children: React.ReactNode;
  deadlines: Deadline[];
};

export default function DeadlinesProvider({ children, deadlines }: Props) {
  const deadlinesValue = useMemo(() => getDeadlinesForDays(deadlines), [deadlines]);

  return (
    <DeadlinesContext.Provider value={deadlinesValue}>
      {children}
    </DeadlinesContext.Provider>
  );
}
