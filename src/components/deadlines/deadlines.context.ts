"use client";
import { createContext, useContext } from 'react';
import { Deadline } from '@prisma/client';
import { WeekDay } from "./types";

type DeadlinesContextValue = {
  getDeadlinesForDay: ({ week, day }: WeekDay) => (number | null)[];
  getDeadlineById: (id: number) => Deadline;
};

export const DeadlinesContext = createContext<DeadlinesContextValue>(undefined as any);

export function useDeadlinesContext() {
  const context = useContext(DeadlinesContext);

  if (context === undefined) {
    throw new Error('No deadlines context provided');
  }

  return context;
}