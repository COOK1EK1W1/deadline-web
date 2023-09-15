import { createContext, useContext } from 'react';

type FormContextValue = {
  getData: (key: string) => string,
  setData: (key: string, value: string) => void;
};

export const FormContext = createContext<FormContextValue>(undefined as any);

export function useFormContext() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('No context provided');
  }

  return context;
}