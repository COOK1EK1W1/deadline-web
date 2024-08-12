import { Input } from "@/components/form";
import { useFormContext } from "../form/form.context";
import { DeadlineType } from "@prisma/client";

export default function DatePicker(){
  const { getData } = useFormContext();

  switch(getData("type")){
    case DeadlineType.Coursework:
    return (
      <div className="flex flex-wrap justify-around">
        <Input name="due" label="Due Date" type="datetime-local" />
      </div>
    )
  default:
    return (
      <div className="flex flex-wrap justify-around">
        <Input name="start" label="Start Date" type="datetime-local" />
        <Input name="due" label="Due Date" type="datetime-local" />
      </div>
    )

  }


}
