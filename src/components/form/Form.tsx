"use client";
import { useState, useCallback } from 'react';
import { FormContext } from './form.context';

// TODO typing for transformers and formatters does not work correctly
type Props<
  T extends Record<string, unknown>,
  TransformerKey extends keyof T,
  FormatterKey extends keyof T,
> = {
  initialData: T;
  color?: number;

  /*
   * transformers are used to convert data received from inputs into the correct type,
   * this data will then be directly available to use in the onSubmit handler without any further
   * transformations needed
   * 
   * transformers are the opposite of formatters
   *  - transformers: input (type string) --> transform --> state (type T[name])
   *  - formatters: state (type T[name]) --> format --> input (type string)
   * 
   * transformers must be an object with keys that match the names of inputs and a correspoding transformer function
   * 
   * transformers: {
   *    age: (value: string) => Number(value)
   *    date: (value: string) => new Date(value)
   * }
   */
  transformers?: Partial<Record<TransformerKey, (value: string) => T[TransformerKey]>>;

  /*
   * formatters are used to convert data stored in state to the correct type that the input needs,
   * 
   * formatters are the opposite of transformers
   *  - transformers: input (type string) --> transform --> state (type T[name])
   *  - formatters: state (type T[name]) --> format --> input (type string)
   * 
   * formatters: {
   *    age: (value: number) => `${value}`
   *    date: (value: Date) => value.toISOString()
   * }
   */
  formatters?: Partial<Record<FormatterKey, (value: T[FormatterKey]) => string>>;

  /*
   * submit handler that also provides the transformed data (in the correct format, ready to use)
   * alongside the original event if needed
   */
  onSubmit?: (formData: T, event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export default function Form<
  T extends Record<string, unknown>,
  TransformerKey extends keyof T,
  FormatterKey extends keyof T,
>(
  { initialData, color, transformers, formatters, onSubmit, children }: Props<T, TransformerKey, FormatterKey>
) {
  // initialise form data using initialData
  // initialData will not be used after this point, nor will it ever change
  const [formData, setFormData] = useState<T>(initialData);

  const setData = useCallback((key: TransformerKey, value: string) => {
    // transform the `string` data from the input to the correct type before storing in state
    // this is done using the correspoding transformer function
    const transformedValue = (transformers && transformers[key]?.(value)) ?? value;;
    setFormData((prev) => ({ ...prev, [key]: transformedValue }));
  }, [transformers, setFormData]);

  const getData = useCallback((key: FormatterKey): string => {
    // format the data in state into the correct form for the input
    // before returning the data to the input
    return (formatters && formatters[key]?.(formData[key])) ?? `${formData[key]}`;
  }, [formatters, formData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(formData, event);
  };

  return (
    // when the children use the `useFormContext` hook, they will receive an object: { getData, setData }
    <FormContext.Provider value={{ getData: getData as any, setData: setData as any }}>
      <form
        onSubmit={handleSubmit}
        className="p-2 bg-slate-200 mb-2 glass"
        style={{ backgroundColor: `lch(73% 41 ${color})` }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}