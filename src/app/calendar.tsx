"use client"
import { useState } from "react"
import Week from "./week"
import Modal from "./modal"

export default function Calendar({startDate, deadlines}: {startDate: Date, deadlines:(Deadline|undefined)[][]}){
  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)
  const [popupDeadline, setPopupDeadline] = useState<{date: Date, deadlines :(Deadline|undefined)[]}>({date: new Date(), deadlines: []})

  function openModal(d: {date: Date, deadlines: (Deadline|undefined)[]}){
    setPopupDeadline(d)
    setshowCover(true)
    setTimeout(()=>setShowModal(true),10);
    document.body.classList.add("modalOpen")
  }
  function closeModal(){
    setShowModal(false)
    setTimeout(()=>setshowCover(false),300);
    document.body.classList.remove("modalOpen")
  } 

  const numWeeks = 12
  const rows = []
  for (var i = 0; i < numWeeks; i++){
    const dateOfWeek = new Date(startDate.getTime() + 7*24*60*60*1000 * i)
    rows.push(
      <div key={i*2}>
        <div className="pl-3">Week {i+1} - Beginning {dateOfWeek.getDate().toString()}/{(dateOfWeek.getMonth() + 1).toString()}</div>
      </div>
    )
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i*2+1} deadlines={deadlines.slice(0+i*7, 7+i*7)} modal={openModal}></Week>
    )
    
  }
      
  return <div className="calendar">
      {rows}
      <div className={`modalCover ${showModal && "active"} ${showCover&&"hidden"}`} onClick={()=>{closeModal()}} onScroll={()=>console.log("scroll")}>
        <div className="flex w-full h-full justify-center">
          <div className="bg-white rounded-3xl modalCard">
            <Modal deadlines={popupDeadline.deadlines} today={popupDeadline.date}/>
            

            
          </div>
        </div>
      </div>


  </div>
}