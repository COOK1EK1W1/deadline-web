"use client"
import { PiNotePencilBold } from "react-icons/pi"

import DateIco from "./date"
import DeadlineCard from "./deadlineCard"
import EditForm from "./editForm"
import { ChangeEventHandler } from "react"

export default function Modal({semStart, deadlines, today, currentEdit, handleChange, setEditForm, showEditForm, setShowEditForm, handleEdit, originalEditData} : {semStart: Date, deadlines: (Deadline | undefined)[], today:Date, currentEdit: Deadline, handleChange: ChangeEventHandler, setEditForm: Function, showEditForm: Boolean, setShowEditForm: Function, handleEdit: Function, originalEditData: Deadline}) {


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
        {showEditForm && <EditForm hide={()=>{setShowEditForm(false)}} day={today} originalData={originalEditData} data={currentEdit} handleChange={handleChange}/>}      
        {deadlineRows}
        {(deadlineRows.length == 0) && !showEditForm && (
      <div className="flex justify-center p-8">No Deadlines!!</div>)}
    </div>
  </div>

}