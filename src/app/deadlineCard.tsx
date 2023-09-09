"use client"
import { PiTrashBold, PiPencilBold } from "react-icons/pi"
export default function DeadlineCard({data, handleEdit}: {data: Deadline, handleEdit: any}){
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

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



  return <div className=" p-2 glass mb-2" style={{backgroundColor:"lch(73% 41 " + data.color + ")"}}>
      <div className="float-right cursor-pointer" onClick={()=>{deleteDeadline()}}><PiTrashBold/></div>

      <div className="float-right cursor-pointer" onClick={()=>{handleEdit(data)}}><PiPencilBold></PiPencilBold></div>

      <div>
        <span className="text-2xl">{data.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{data.subject}</span>
        <div>
          <p>Starts: {new Date(data.start).toLocaleDateString()} at {new Date(data.start).toLocaleTimeString()}</p>
          <p>{days[new Date(data.start).getDay()]} of week {1}</p>
        </div>
        <div>
          <p>Due: {new Date(data.due).toLocaleDateString()} at {new Date(data.due).toLocaleTimeString()}</p>
          <p>{days[new Date(data.due).getDay()]} of week {1}</p>
        </div>

      </div>
      
    </div>

}