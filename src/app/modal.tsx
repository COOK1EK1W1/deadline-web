"use client"
import { PiNotePencilBold } from "react-icons/pi"

import DateIco from "./date"
import DeadlineCard from "./deadlineCard"
import EditForm from "./editForm"
import { useState } from "react"
import { Deadline } from "@prisma/client"

export default function Modal({semStart, deadlines, today} : {semStart: Date, deadlines: (Deadline | undefined)[], today:Date}) {

  const [showEditForm, setShowEditForm] = useState(false);

  const defaultDeadline: Deadline = {
    name: "",
    subject: "",
    start: null,
    due: today,
    mark: 0,
    room: "",
    url: "",
    info: "",
    color: 1,
  }
  const [currentEdit, setCurrentEdit] = useState<Deadline>(defaultDeadline)
  const [originalEdit, setOriginalEdit] = useState<Deadline>(defaultDeadline)


  function handleEdit(stuff: Deadline){
    setShowEditForm(true)
    setCurrentEdit(stuff)
    setOriginalEdit(stuff)
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEdit({
      ...currentEdit,
      [name]: value,
    });
  };

  //add all the deadline cards to the modal
  const deadlineRows = []
  for (let i = 0; i < deadlines.length; i++){
    const cur = deadlines[i]
    if (cur !== undefined){
      deadlineRows.push(
        <DeadlineCard semStart={semStart} data={cur} key={i} handleEdit={()=>{handleEdit(cur)}}></DeadlineCard>
      )
    }
  }

  return <div className="m-2" onClick={(e)=>{e.stopPropagation()}}>
      <div className="flex justify-between">
        <DateIco date={today} showDay={false}/>
    
        {!showEditForm && <button type="button" className="bg-green-300 hover:bg-blue-400 rounded-full m-1 p-1 w-40" onClick={()=>{setShowEditForm(true)}}>
          <PiNotePencilBold style={{display: "inline"}} /> Create New
        </button>}
      </div>
      
      <div className="h-[53vh] overflow-y-auto">
        {showEditForm && <EditForm hide={()=>{setShowEditForm(false)}} day={today} originalData={originalEdit} data={currentEdit} handleChange={handleChange}/>}      
        {deadlineRows}
        {(deadlineRows.length == 0) && !showEditForm && (
      <div className="flex justify-center p-8">No Deadlines!!</div>)}
    </div>
  </div>

}