"use client";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Deadline } from "@prisma/client";
import { Form, Input } from '@/components/form';
import { useState } from 'react';
import { createAction, editAction } from "../form/formAction";
import { useTransition } from "react";

type Props = {
  initialData: Deadline;
  onClose: () => void;
  onChange: () => void;
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
  start: (value: Date | null) => value?.toISOString().substring(0, 16) ?? '',
  due: (value: Date | null) => value?.toISOString().substring(0, 16) ?? '',
};

export default function EditForm({ onClose, onChange, initialData }: Props) {

  const [isPending, startTransition] = useTransition();

  const [color, setColor] = useState<number>(initialData.color ?? 1);

  const handleSubmit = async (formData: Deadline) => {
    let response = null;
    if (initialData.name !== "" && initialData.subject !== "") {
      startTransition(() => {
        editAction(formData, "" + window.prompt("enter the password"), initialData.name, initialData.subject)
      })

      startTransition(() => {
        createAction(formData, String(window.prompt("Enter the password")))
      })
      response = { status: 200 }

    };
  }

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

      <div className='flex flex-col gap-5'>
        <div className="flex flex-wrap justify-around">
          <Input name='name' label='Name' type='text' required />
          <Input name='subject' label='Subject' type='text' required />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name='start' label='Start Date' type='datetime-local' />
          <Input name='due' label='Due Date' type='datetime-local' />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name='mark' label='Mark' type='number' />
          <Input name='url' label='URL' type='url' />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input name='room' label='Room' type='text' />
          {/* TODO create a Textarea component and replace info Input */}
          <Input name='info' label='Info' type='text' />
        </div>

        <div className="flex flex-wrap justify-around">
          <Input
            name='color'
            label='Color'
            type='range'
            min={1}
            max={360}
            onChange={(value) => setColor(Number(value))}
          />
        </div>

        <button type="submit" className="w-min self-center flex items-center gap-1 rounded-full bg-white p-2 hover:scale-105">
          Submit <PiPaperPlaneTiltBold />
        </button>
      </div>
    </Form>
  );
}
