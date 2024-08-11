"use client";
import { createContext, useContext } from 'react';
import { Course, Deadline } from '@prisma/client';
import { WeekDay } from "./types";
import { ProgrammeDeadlines } from '@/types/programmeDeadline';

type DeadlinesContextValue = {
  programme: ProgrammeDeadlines
  getDeadlinesForDay: ({ week, day }: WeekDay) => (number | null)[];
  getDeadlineById: (id: number) => Deadline & Course;
};

export const DeadlinesContext = createContext<DeadlinesContextValue>(undefined as any);

export function useDeadlines() {
  const context = useContext(DeadlinesContext);

  if (context === undefined) {
    throw new Error('No deadlines context provided');
  }

  return context;
}
