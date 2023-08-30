"use client"
import { useState } from "react"
import Week from "./week"

export default function Calendar({startDate, deadlines}: {startDate: Date, deadlines:(Deadline|undefined)[][]}){
  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)
  const [popupDeadline, setPopupDeadline] = useState<(Deadline|undefined)[]>([])

  function openModal(d: (Deadline|undefined)[]){
    setPopupDeadline(d)
    setshowCover(true)
    setTimeout(()=>setShowModal(true),10);
  }
  function closeModal(){
    setShowModal(false)
    setTimeout(()=>setshowCover(false),300);
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
      <Week startOfWeek={dateOfWeek} key={i} deadlines={deadlines.slice(0+i*7, 7+i*7)} modal={openModal}></Week>
    )
    
  }
      
  return <div className="calendar">
      {rows}
      <div className={`modalCover ${showModal && "active"} ${showCover&&"hidden"}`} onClick={()=>{closeModal()}}>
        <div className="flex w-full h-full justify-center">
          <div className="bg-white rounded-3xl modalCard">
            <div className="m-2">
              {popupDeadline.map((x, i) =>{

                return (x !== undefined && <div className="pb-4" key={i}>
                  <h2>{x.name}</h2>
                  <h3>{x.subject}</h3>
                  <p>start: {x.start}</p>
                  <p>due: {x.due}</p>
                </div>)

                })}

            </div>
            
          </div>
        </div>
      </div>


  </div>
}