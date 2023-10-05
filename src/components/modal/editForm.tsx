"use client";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Deadline } from "@prisma/client";
import { Form, Input } from "@/components/form";
import { useState } from "react";
import { createAction, editAction } from "./formAction";
import { useTransition } from "react";
import Spinner from "@/components/spinner/Spinner";
import { format } from "date-fns";
import { useDeadlines } from '../deadlines/deadlines.context';

type Props = {
  id: number | null;
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
  color: (value: string) => Number(value) || Number(value.slice(0, -1)),
};

// formatters that convert values from state to a value that the inputs can use,
// keep out of component to avoid unnecessary recreation of these objects on each render
const formatters = {
  start: (value: Date | null) =>
    format(value || new Date(), "yyyy-MM-dd'T'HH:mm"),
  due: (value: Date | null) =>
    format(value || new Date(), "yyyy-MM-dd'T'HH:mm"),
};

export default function EditForm({
  onClose,
  onChange,
  onSubmit,
  id,
  dateOfDay
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { getDeadlineById } = useDeadlines();

  const currentDeadline = id ? getDeadlineById(id) : null;
  const initialData = currentDeadline || {
    name: "",
    subject: "",
    start: null,
    due: dateOfDay,
    room: "",
    url: "",
    color: 1,
    mark: 0,
    info: "",
    id: -1
  };

  const [color, setColor] = useState<number>(initialData.color ?? 1);

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

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap justify-around">
          <Input name="name" label="Name" type="text" required />
          <Input name="subject" label="Subject" type="text" required />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name="start" label="Start Date" type="datetime-local" />
          <Input name="due" label="Due Date" type="datetime-local" />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name="mark" label="Mark" type="number" />
          <Input name="url" label="URL" type="url" />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name="room" label="Room" type="text" />
          {/* TODO create a Textarea component and replace info Input */}
          <Input name="info" label="Info" type="text" />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input
            name="color"
            label="Color"
            type="range"
            min={1}
            max={360}
            onChange={(value) => setColor(Number(value))}
          />
        </div>

        <button
          type="submit"
          className="w-min self-center flex items-center gap-1 rounded-full bg-white dark:bg-slate-800 p-2 px-4 hover:scale-105"
        >
          Submit
          {isPending ? <Spinner size={20} /> : <PiPaperPlaneTiltBold />}
        </button>
      </div>
    </Form>
  );
}
