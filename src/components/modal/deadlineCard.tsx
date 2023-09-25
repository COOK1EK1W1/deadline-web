"use client"
import { Deadline } from "@prisma/client";
import { differenceInWeeks, format } from "date-fns";
import Link from "next/link";
import { PiTrashBold, PiPencilBold } from "react-icons/pi"
import { useTransition } from "react";
import { deleteAction } from "./formAction";

export default function DeadlineCard({ semStart, data, handleEdit }: { semStart: Date, data: Deadline, handleEdit: Function }) {
  const [isPending, startTransition] = useTransition();

  if (!data) return null;


  const deleteDeadline = async () => {
    startTransition(async ()=>{
      const response = await deleteAction(String(window.prompt("enter the password")), data.name, data.subject)
      if (!response){
        window.alert("there was an error")
      }
    })
  }


  return <div className=" p-2 glass mb-2" style={{ backgroundColor: "lch(73% 41 " + data.color + ")" }}>
    <div className="float-right cursor-pointer" onClick={() => { deleteDeadline() }}><PiTrashBold /></div>

    <div className="float-right cursor-pointer" onClick={() => handleEdit()}><PiPencilBold></PiPencilBold></div>

    <div>
      <div className="pb-2">
        <span className="text-2xl">{data.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{data.subject}</span>
        <span className="w-4 inline-block"></span>
        <span>{data.mark}%</span>

      </div>

      <div className="flex flex-wrap justify-start pb-2">
        {data.start && <div className="pr-4 pb-4">
          <p>Starts: { format(data.start, "Pp")}</p>
          <p>{`${format(data.start, 'EEEE')} of week ${differenceInWeeks(data.start, semStart) + 1}`}
        </p>
        </div>}
        <div>
          <p>Due: {new Date(data.due).toLocaleDateString()} at {new Date(data.due).toLocaleTimeString()}</p>
          <p>{format(data.due, 'EEEE')} of week {differenceInWeeks(data.due, semStart) + 1}</p>
        </div>
      </div>

      <div>
        {(!data.info && !data.room && !data.url) && <p className="text-sm">More info will apear here..</p>}
        <p>{data.info}</p>
        {(data.room) && <p>Location: {data.room}</p>}
        {(data.url) && <Link href={data.url} className="underline hover:no-underline">Spec/Submission</Link>}
      </div>


    </div>

  </div>

}