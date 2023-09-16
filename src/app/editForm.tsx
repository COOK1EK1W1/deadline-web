"use client";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Deadline } from "@prisma/client";
import { Form, Input } from '@/components/form';
import { useState } from 'react';

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

export default function EditForm({ hide, initialData }: { hide: Function, initialData: Deadline; }) {
  const [color, setColor] = useState<number>(initialData.color ?? 1);

  const handleSubmit = async (formData: Deadline) => {
    try {
      let response = null;
      if (initialData.name !== "" && initialData.subject !== "") {
        response = await fetch('/api/deadlines', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, oldName: initialData.name, oldSubject: initialData.subject, password: window.prompt("enter the password") }),
        });

      } else {
        response = await fetch('/api/deadlines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, password: window.prompt("enter password") }),
        });
      }

      if (response.status === 200) {
        console.log('Form submitted successfully');
        window.alert("Form submitted successfully");
        location.reload();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form
      initialData={initialData}
      transformers={transformers}
      formatters={formatters}
      color={color}
      onSubmit={handleSubmit}
    >
      <div className="float-right">
        <AiOutlineClose className="cursor-pointer" onClick={() => hide()} />
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