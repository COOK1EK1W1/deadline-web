"use client"
import {AiOutlineClose} from "react-icons/ai"
import { useState } from "react"
import { PiPaperPlaneTiltBold } from "react-icons/pi";
export default function NewForm({hide}:{hide: CallableFunction}){

  const defaultDeadline:Deadline = {
    name: '',
    subject: '',
    due: '',
    start: '',
    mark: 0,
    room: '',
    url: '',
    info: '',
  }

  const [formData, setFormData] = useState<Deadline>(defaultDeadline);
  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      const response = await fetch('/api/deadlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, password: window.prompt("enter password")}),
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
        window.alert("Form submitted successfully")
        location.reload();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return <form onSubmit={handleSubmit} className="p-2 bg-slate-200 mb-2 glass">
          <div className="float-right">
            <AiOutlineClose className="cursor-pointer" onClick={()=>{hide()}}/>
          </div>
          <div className="flex justify-around flex-wrap">
          
            <div className="pb-2"> 
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                value={formData.subject}
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
                value={formData.start}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dueDate">Due Date: </label>
              <input
                type="datetime-local"
                id="due"
                name="due"
                value={formData.due}
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
                value={formData.mark}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="url">Url: </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </div>

          </div>
          
          <div>
            <label htmlFor="info">Info: </label>
            <textarea
              id="info"
              name="info"
              value={formData.info}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-center">
            <button type="submit" className="rounded-full bg-white p-2 hover:scale-105">Submit <PiPaperPlaneTiltBold style={{display:"inline-block"}}/></button>
          </div>
        </form>


}