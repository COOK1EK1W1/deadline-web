"use client"
import { useState } from "react"
import DateIco from "./date"
import { PiNotePencilBold, PiTrashBold, PiPaperPlaneTiltBold } from "react-icons/pi"
import {AiOutlineClose} from "react-icons/ai"

export default function Modal({deadlines, today} : {deadlines: (Deadline | undefined)[], today:Date}){
  const [showNewForm, setShowNewForm] = useState(false);
  function openNewForm(){
    setShowNewForm(true);
  }
  const deleteDeadline = async (name: string, subject: string) => { 
      const response = await fetch('/api/deadlines', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, subject: subject}),
      });
  }

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
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const deadlineRows = []
  for (let i = 0; i < deadlines.length; i++){
    const cur = deadlines[i]
    if (cur !== undefined){
    deadlineRows.push(
      <div className=" p-2 glass mb-2" key={i}>
        <div className="float-right cursor-pointer" onClick={()=>{deleteDeadline(cur.name, cur.subject)}}><PiTrashBold></PiTrashBold></div>

        <span className="text-2xl">{cur.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{cur.subject}</span>
        <div>
          <p>starts:</p>
          <p>{new Date(cur.start).toLocaleDateString()} at {new Date(cur.start).toLocaleTimeString()}</p>
        </div>
        <p>due: {cur.due}</p>
        <p>{new Date(cur.start).toLocaleTimeString("eu-US")}</p>
        </div>
        
    )

    }
    
  }
  return <div className="m-2" onClick={(e)=>{e.stopPropagation()}}>
    <div className="flex justify-between">
      <DateIco date={today} showDay={false}/>
    
      <button type="button" className="bg-green-300 hover:bg-blue-400 rounded-full m-1 p-1 w-40" onClick={openNewForm}>
        <PiNotePencilBold style={{display: "inline"}} /> Create New
        </button>
    </div>
    <div className="h-[53vh] overflow-y-auto">
    
      
        {showNewForm && <form onSubmit={handleSubmit} className="p-2 bg-slate-200 mb-2 glass">
          <div className="float-right">
            <AiOutlineClose className="cursor-pointer" onClick={()=>{setShowNewForm(false)}}/>
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
        </form>}

      {deadlineRows}

      {(deadlineRows.length == 0) && !showNewForm && (
      <div className="flex justify-center p-8">No Deadlines!!</div>)}
    </div>
    
  </div>

}