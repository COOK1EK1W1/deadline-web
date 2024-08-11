"use client";
import { useId } from "react";
import { useFormContext } from "./form.context";

type Props = {
  name: string; // Form component uses `name` to keep track of data
  label: string; // label that gets displayed to user
  options: string[]
  onChange?: (data: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Input({
  name,
  label,
  onChange,
  options,
}: Props) {
  const id = useId(); // react will handle IDs for us
  const { getData, setData } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("change")
    setData(name, event.target.value);
    onChange?.(event.target.value, event);
  };

  return (
    <div>
      <label htmlFor={id}>{label}: </label>
      <select id={id} name={name} value={getData(name)} onChange={handleChange} >
        {options.map((x, id) =>(
          <option key={id}>{x}</option>


        ))}
      </select>
    </div>
  );
}
