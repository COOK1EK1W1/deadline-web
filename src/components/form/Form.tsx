"use client";
import { useState, useCallback } from 'react';
import { FormContext } from './form.context';

type Props<
  T extends Record<string, unknown>,
  TransformerKey extends keyof T,
  FormatterKey extends keyof T,
> = {
  initialData: T;
  color?: number;
  transformers?: Partial<Record<TransformerKey, (value: string) => T[TransformerKey]>>;
  formatters?: Partial<Record<FormatterKey, (value: T[FormatterKey]) => string>>;
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
  const [formData, setFormData] = useState<T>(initialData);

  const setData = useCallback((key: TransformerKey, value: string) => {
    const transformedValue = (transformers && transformers[key]?.(value)) ?? value;;
    setFormData((prev) => ({ ...prev, [key]: transformedValue }));
  }, [transformers, setFormData]);

  const getData = useCallback((key: FormatterKey): string => {
    return (formatters && formatters[key]?.(formData[key])) ?? `${formData[key]}`;
  }, [formatters, formData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(formData, event);
  };

  return (
    <FormContext.Provider value={{ getData: getData as any, setData: setData as any }}>
      <form
        onSubmit={handleSubmit}
        className="p-2 bg-slate-200 mb-2 glass"
        style={{ backgroundColor: "lch(73% 41 " + color + ")" }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}