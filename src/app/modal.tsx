"use client"
import { useState } from "react"
import { PiNotePencilBold } from "react-icons/pi"

import DateIco from "./date"
import DeadlineCard from "./deadlineCard"
import NewForm from "./newForm"

export default function Modal({deadlines, today} : {deadlines: (Deadline | undefined)[], today:Date}){

  //new form show / hide functions
  const [showNewForm, setShowNewForm] = useState(false);
  function openNewForm(){
    setShowNewForm(true);
  }
  function closeNewForm(){
    setShowNewForm(false);
  }

  //add all the deadline cards to the modal
  const deadlineRows = []
  for (let i = 0; i < deadlines.length; i++){
    const cur = deadlines[i]
    if (cur !== undefined){
      deadlineRows.push(
        <DeadlineCard data={cur} key={i}></DeadlineCard>
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
        {showNewForm && <NewForm hide={closeNewForm}/>}      
        {deadlineRows}
        {(deadlineRows.length == 0) && !showNewForm && (
      <div className="flex justify-center p-8">No Deadlines!!</div>)}
    </div>
  </div>

}