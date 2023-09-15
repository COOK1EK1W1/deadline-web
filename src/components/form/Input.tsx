"use client";
import { useId } from 'react';
import { useFormContext } from './form.context';

type Props = {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  required?: boolean;
};

export default function Input({ name, label, type, required }: Props) {
  const id = useId();
  const { getData, setData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(name, event.target.value);
  };

  return (
    <div className="pb-2">
      <label htmlFor={id}>{label}: </label>
      <input
        type={type}
        id={id}
        name={name}
        value={getData(name)}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}