"use client";
import { createContext, useContext } from 'react';
import { Deadline } from '@prisma/client';

export const DeadlinesContext = createContext<{ deadlinesForDays: (number | null)[][], deadlines: Deadline[] }>(undefined as any);

export function useDeadlinesContext() {
  const context = useContext(DeadlinesContext);

  if (context === undefined) {
    throw new Error('No deadlines context provided');
  }

  return context;
}