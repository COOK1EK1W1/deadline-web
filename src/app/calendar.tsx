
"use client"
import { useState } from "react"
import Week from "./week"
import Modal from "./modal"
import { Deadline } from "@prisma/client"
import { addDays, differenceInBusinessDays, differenceInCalendarWeeks } from "date-fns"

export default function Calendar({startDate, semesterStart, weeks, deadlines}: {startDate: Date, semesterStart:Date, weeks: number, deadlines:(Deadline|null)[][]}){
  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)
  const [modalDeadlines, setModalDeadline] = useState<{date: Date, deadlines :(Deadline|undefined)[]}>({date: new Date(), deadlines: []})


  function openModal(d: {date: Date, deadlines: (Deadline|undefined)[]}){
    setModalDeadline(d)
    setshowCover(true)
    setTimeout(()=>setShowModal(true),10);
    document.body.classList.add("modalOpen")

  }
  function closeModal() {
    setShowModal(false);
    setTimeout(() => setshowCover(false), 300);
    document.body.classList.remove("modalOpen");

  }


  const rows = []
  for (var i = 0; i < weeks; i++){
    const dateOfWeek = addDays(startDate, 7 * i)
    if (semesterStart.getTime() <= dateOfWeek.getTime()){

      rows.push(
        <div key={i*2}>
          <div className="pl-3">Week {differenceInCalendarWeeks(dateOfWeek, semesterStart) + 1} - Beginning {dateOfWeek.getDate().toString()}/{(dateOfWeek.getMonth() + 1).toString()}</div>

        </div>
      );
    }
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i * 2 + 1} deadlines={deadlines.slice(0 + i * 7, 7 + i * 7)} modal={openModal}></Week>

    );

  }

  return <div className="calendar">
    <div className="week flex sticky top-0 py-2 glass">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
        <div className="w-full text-center" key={i}>{day}</div>

      ))}
    </div>
    {rows}
    <div className={`modalCover ${showModal && "active"} ${showCover && "hidden"}`} onClick={() => { closeModal(); }} onScroll={() => console.log("scroll")}>
      <div className="flex w-full h-full justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-3xl modalCard">
          <Modal semStart={semesterStart} deadlines={modalDeadlines.deadlines} today={modalDeadlines.date} />
        </div>
      </div>
    </div>
  </div>;
}