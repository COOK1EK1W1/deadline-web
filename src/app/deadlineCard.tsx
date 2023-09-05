"use client"
import { PiTrashBold, PiPencilBold } from "react-icons/pi"
export default function DeadlineCard({data}: {data: Deadline}){

  const deleteDeadline = async () => { 
    
      
    try {
      const response = await fetch('/api/deadlines', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: data.name, subject: data.subject}),
      });

      if (response.status === 200) {
        console.log('Deleted Deadline');
        window.alert("Deleted Deadline")
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return <div className=" p-2 glass mb-2">
      <div className="float-right cursor-pointer" onClick={()=>{deleteDeadline()}}><PiTrashBold/></div>

      {/* <div className="float-right cursor-pointer" onClick={()=>{updateDeadline(data.name, data.subject)}}><PiPencilBold></PiPencilBold></div> */}

      <span className="text-2xl">{data.name}</span>
      <span className="w-4 inline-block"></span>
      <span>{data.subject}</span>
      <div>
        <p>starts:</p>
        <p>{new Date(data.start).toLocaleDateString()} at {new Date(data.start).toLocaleTimeString()}</p>
      </div>
      <p>due: {data.due}</p>
      <p>{new Date(data.start).toLocaleTimeString("eu-US")}</p>
    </div>

}