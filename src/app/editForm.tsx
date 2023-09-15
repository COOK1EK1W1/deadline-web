"use client";
import { ChangeEventHandler } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Deadline } from "@prisma/client";
import { Form, Input } from '@/components/form';

export default function EditForm({ hide, day, originalData, data, handleChange }: { hide: Function, day: Date, originalData: Deadline, data: Deadline, handleChange: ChangeEventHandler; }) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let response = null;
      if (originalData.name !== "" && originalData.subject !== "") {
        response = await fetch('/api/deadlines', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, oldName: originalData.name, oldSubject: originalData.subject, password: window.prompt("enter the password") }),
        });

      } else {
        response = await fetch('/api/deadlines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, password: window.prompt("enter password") }),
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

  return <form onSubmit={handleSubmit} className="p-2 bg-slate-200 mb-2 glass" style={{ backgroundColor: "lch(73% 41 " + data.color + ")" }}>
    <div className="float-right">
      <AiOutlineClose className="cursor-pointer" onClick={() => { hide(); }} />
    </div>
    <div className="flex justify-around flex-wrap">

      <div className="pb-2">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="pb-2">
        <label htmlFor="subject">Subject: </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={data.subject}
          onChange={handleChange}
          required
          className="rounded"
        />
      </div>
    </div>

    <div className="flex flex-wrap justify-around pb-2">
      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="datetime-local"
          id="start"
          name="start"
          value={data.start ? data.start.toISOString().substring(0, 16) : ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="dueDate">Due Date: </label>
        <input
          type="datetime-local"
          id="due"
          name="due"
          value={data.due.toISOString().substring(0, 16)}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    <div className="flex flex-wrap justify-around pb-2">
      <div>
        <label htmlFor="mark">Mark: </label>
        <input
          type="number"
          id="mark"
          name="mark"
          value={data.mark || 0}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="url">Url: </label>
        <input
          type="url"
          id="url"
          name="url"
          value={data.url || ""}
          onChange={handleChange}
        />
      </div>

    </div>
    <div className="flex flex-wrap justify-around pb-2">
      <div>
        <label htmlFor="room">Room: </label>
        <input
          type="text"
          id="room"
          name="room"
          value={data.room || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="info">Info: </label>
        <textarea
          id="info"
          name="info"
          value={data.info || ""}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="flex justify-center pb-2">
      <div>
        <label htmlFor="color">Color: </label>
        <input
          type="range" min={1} max={360}
          id="color"
          name="color"
          value={data.color || 1}
          onChange={handleChange}>
        </input>
      </div>

    </div>


    <div className="flex justify-center">
      <button type="submit" className="rounded-full bg-white p-2 hover:scale-105">Submit <PiPaperPlaneTiltBold style={{ display: "inline-block" }} /></button>
    </div>
  </form>;


}