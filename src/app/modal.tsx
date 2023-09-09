"use client"
import { PiNotePencilBold } from "react-icons/pi"

import DateIco from "./date"
import DeadlineCard from "./deadlineCard"
import EditForm from "./editForm"

export default function Modal({deadlines, today, currentEdit, handleChange, setEditForm, showEditForm, setShowEditForm, handleEdit, originalEditData} : {deadlines: (Deadline | undefined)[], today:Date, currentEdit: Deadline, handleChange: any, setEditForm: any, showEditForm: any, setShowEditForm: any, handleEdit: any, originalEditData: Deadline}) {


  //add all the deadline cards to the modal
  const deadlineRows = []
  console.log(deadlines)
  for (let i = 0; i < deadlines.length; i++){
    const cur = deadlines[i]
    if (cur !== undefined){
      deadlineRows.push(
        <DeadlineCard data={cur} key={i} handleEdit={handleEdit}></DeadlineCard>
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