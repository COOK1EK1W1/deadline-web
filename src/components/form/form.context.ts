import { createContext, useContext } from 'react';

type FormContextValue = {
  getData: (key: string) => string,
  setData: (key: string, value: string) => void;
};

// react's context API is used to pass down data and functions to child components
// instead of passing them down as props, this is mainly done for the form
// because we dont know in advanced how many children the Form component will have
// so context allows each child to access the data instead of the Form component
// passing data down as props
export const FormContext = createContext<FormContextValue>(undefined as any);

// child components will use this hook to gain access to data
// look at Form.tsx to determine what type of data the hook will provide
export function useFormContext() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('No context provided');
  }

  return context;
}