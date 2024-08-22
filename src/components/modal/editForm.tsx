"use client";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Deadline, DeadlineType } from "@prisma/client";
import { Form, Input, Select } from "@/components/form";
import { createAction, editAction } from "./formAction";
import { useTransition } from "react";
import Spinner from "@/components/spinner/Spinner";
import { add, format, Duration } from "date-fns";
import { useDeadlines } from '../deadlines/deadlines.context';
import DatePicker from "./datePicker";
import Button from "../button";

type Props = {
  deadlineId: number | null;
  dateOfDay: Date;
  onClose: () => void;
  onChange: () => void;
  onSubmit: () => void;
};

// transformers that convert values from the inputs to the correct type,
// keep out of component to avoid unnecessary recreation of these objects on each render
const transformers = {
  start: (value: string) => new Date(value),
  due: (value: string) => new Date(value),
  mark: (value: string) => Number(value) || Number(value.slice(0, -1)),
};

// formatters that convert values from state to a value that the inputs can use,
// keep out of component to avoid unnecessary recreation of these objects on each render
const formatters = {
  start: (value: Date | null) =>
    format(value || new Date(), "yyyy-MM-dd'T'HH:mm"),
  due: (value: Date | null) =>
    format(value || new Date(), "yyyy-MM-dd'T'HH:mm"),
};

export default function EditForm({ onClose, onChange, onSubmit, deadlineId, dateOfDay }: Props) {
  const [isPending, startTransition] = useTransition();
  const { getDeadlineById, programme} = useDeadlines();

  let initialData: Deadline = {
    type: DeadlineType.Coursework,
    name: "",
    courseCode: programme?.courses[0].code || "",
    start: null,
    due: add(dateOfDay, {hours: 15, minutes: 30}),
    room: "",
    url: "",
    mark: 0,
    info: "",
    id: -1
  }

  if (deadlineId){
    const { type, id, name, courseCode, start, due, mark, room, url, info } = getDeadlineById(deadlineId)
    initialData = { type, id, name, courseCode, start, due, mark, room, url, info }

  }

  const handleSubmit = async (formData: Deadline) => {
    startTransition(async () => {
      const response =
        initialData.id != -1
          ? await editAction(
            formData,
            String(window.prompt("enter the password"))
          )
          : await createAction(
            formData,
            String(window.prompt("Enter the password"))
          );

      if (response) {
        onSubmit();
      } else {
        window.alert("there was an error");
      }
    });
  };

  let color = Number(programme?.courses.filter((x)=>x.code == initialData.courseCode)[0].color) || 1

  return (
    <Form
      initialData={initialData}
      transformers={transformers}
      formatters={formatters}
      color={color}
      onSubmit={handleSubmit}
      onChange={() => onChange()}
    >
      <div className="float-right">
        <AiOutlineClose className="cursor-pointer" onClick={() => onClose()} />
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <Input name="name" label="Name" type="text" required />
          <Select name="courseCode" label="Course" options={programme?.courses.map((x) => x.title) || []}/>
        </div>
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <Select name="type" label="Deadline Type" options={Object.values(DeadlineType)}/>
          <Input name="mark" label="Mark %" type="number" min={0} max={100}/>
        </div>

        <DatePicker/>


        <div className="flex flex-wrap md:flex-nowrap w-full">
          <Input name="room" label="Room" type="text" />
          <Input name="url" label="URL" type="url" />
        </div>


        <div className="flex flex-wrap md:flex-nowrap">
          {/* TODO create a Textarea component and replace info Input */}
          <Input name="info" label="Info" type="text" />
        </div>


        <Button type="submit" className="w-40">
          <span className="pr-2">Submit</span>
            <span className="inline">{isPending ? <Spinner size={20}/> : <PiPaperPlaneTiltBold className="inline"/>}</span>
        </Button>
      </div>
    </Form>
  );
}
