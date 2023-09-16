"use client";
import React from 'react';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';

type Data = {
  email: string;
  age: number;
  date: Date;
};

const data: Data = {
  email: "",
  age: 9,
  date: new Date()
};

const transformer = {
  age: (value: string) => Number(value) || Number(value.slice(0, -1)),
  date: (value: string) => new Date(value)
};

const formatters = {
  date: (value: Date) => value.toISOString().substring(0, 16)
};

export default function Test() {
  return (
    <Form
      initialData={data}
      color={255}
      transformers={transformer}
      formatters={formatters}
      onSubmit={(data, event) => console.log(data)}
    >
      <Input name='email' label='Email' type='email' />
      <Input name='age' label='Age' type='range' />
      <Input name='date' label='Age' type='datetime-local' />
      <button type='submit'>Submit</button>
    </Form>
  );
}
