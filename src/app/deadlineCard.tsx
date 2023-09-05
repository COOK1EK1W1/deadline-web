"use client"
import { useState } from "react";
import { PiTrashBold, PiPencilBold, PiPaperPlaneTiltBold } from "react-icons/pi"
export default function DeadlineCard({data}: {data: Deadline}){

  const [Ddata, setDData] = useState(data);
  const [showEdit, setShowEdit] = useState(false);
  if (!data) return null;


  const deleteDeadline = async () => { 
    try {
      const response = await fetch('/api/deadlines', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: data.name, subject: data.subject, password: window.prompt("enter password")}),
      });

      if (response.status === 200) {
        console.log('Deleted Deadline');
        window.alert("Deleted Deadline")
        location.reload();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  function toggleEdit(){
    setShowEdit(!showEdit);
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDData({
      ...Ddata,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/deadlines', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...Ddata, oldName: data.name, oldSubject:data.subject, password:window.prompt("enter the password")}),
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


  return <div className=" p-2 glass mb-2" style={{backgroundColor:"lch(73% 41 " + Ddata.color + ")"}}>
      <div className="float-right cursor-pointer" onClick={()=>{deleteDeadline()}}><PiTrashBold/></div>

      <div className="float-right cursor-pointer" onClick={()=>{toggleEdit()}}><PiPencilBold></PiPencilBold></div>
      {showEdit && <form onSubmit={handleSubmit}>
        <div className="flex justify-around flex-wrap">
          
          <div className="pb-2"> 
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={Ddata.name}
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
              value={Ddata.subject}
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
              value={Ddata.start}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="dueDate">Due Date: </label>
            <input
              type="datetime-local"
              id="due"
              name="due"
              value={Ddata.due.slice(0, 16)}
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
              value={Ddata.mark}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="url">Url: </label>
            <input
              type="url"
              id="url"
              name="url"
              value={Ddata.url}
              onChange={handleChange}
            />
          </div>

        </div>
        
        <div className="flex flex-wrap justify-around pb-2">
          <div>
          <label htmlFor="info">Info: </label>
          <textarea
            id="info"
            name="info"
            value={Ddata.info}
            onChange={handleChange}
          />
          </div>
            <div>
              <label htmlFor="color">Color: </label>
              <input 
                type="range" min={1} max={360}
                id="color"
                name="color"
                value={Ddata.color}
                onChange={handleChange}>
              </input>
            </div>
        </div>
          <div className="flex justify-center">
            <button type="submit" className="rounded-full bg-white p-2 hover:scale-105">Submit <PiPaperPlaneTiltBold style={{display:"inline-block"}}/></button>
          </div>
        
      </form>

      }
      

      {!showEdit && <div>
        <span className="text-2xl">{Ddata.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{Ddata.subject}</span>
        <div>
          <p>starts:</p>
          <p>{new Date(Ddata.start).toLocaleDateString()} at {new Date(Ddata.start).toLocaleTimeString()}</p>
        </div>
        <p>due: {Ddata.due}</p>
        <p>{new Date(data.start).toLocaleTimeString("eu-US")}</p>

      </div>}
      
    </div>

}