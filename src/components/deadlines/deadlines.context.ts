import { createContext, useContext } from 'react';
import { Deadline } from '@prisma/client';

export const DeadlinesContext = createContext<(Deadline | null)[][]>(undefined as any);

export function useDeadlinesContext() {
  const context = useContext(DeadlinesContext);

  if (context === undefined) {
    throw new Error('No context provided');
  }

  return context;
}