"use client"
import { useState } from "react"
import Week from "./week"

export default function Calendar({startDate, deadlines}: {startDate: Date, deadlines:(Deadline|undefined)[][]}){
  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)

  function toggleModal(a: boolean){
    if (a){
      //open
      setshowCover(a)
      setTimeout(()=>setShowModal(a),10);
    }else{
      setShowModal(a)
      setTimeout(()=>setshowCover(a),300);
    }
    
    
  }

  const numWeeks = 12
  const rows = []
  for (var i = 0; i < numWeeks; i++){
    const dateOfWeek = new Date(startDate.getTime() + 7*24*60*60*1000 * i)
    rows.push(
      <div key={i}>
        <div className="pl-3">Week {i+1} - Beginning {dateOfWeek.getDate().toString()}/{(dateOfWeek.getMonth() + 1).toString()}</div>
      </div>
    )
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i} deadlines={deadlines.slice(0+i*7, 7+i*7)} modal={toggleModal}></Week>
    )
    
  }
      
  return <div className="calendar">
      {rows}
      <div className={`modalCover ${showModal && "active"} ${showCover&&"hidden"}`} onClick={()=>{toggleModal(false)}}>
        <div className="flex w-full h-full justify-center">
          <div className="bg-white rounded-3xl shadow-2xl modalCard">bruh</div>
        </div>
      </div>


  </div>
}