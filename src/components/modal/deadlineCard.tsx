"use client"
import { Deadline } from "@prisma/client";
import { differenceInWeeks, format } from "date-fns";
import Link from "next/link";
import { PiTrashBold, PiPencilBold } from "react-icons/pi"
import { useTransition } from "react";
import { deleteAction } from "./formAction";
import { useModalMutators } from "./modalProvider";

import { env } from '@/config/env/client';

export default function DeadlineCard({ data, handleEdit }: { data: Deadline, handleEdit: Function }) {
  const [isPending, startTransition] = useTransition();
  const { closeModal } = useModalMutators();

  if (!data) return null;

  const deleteDeadline = async () => {
    startTransition(async ()=>{
      const response = await deleteAction(String(window.prompt("enter the password")), data.id)
      if (!response){
        window.alert("there was an error")
      }else{
        closeModal()
      }
    })
  }


  return <div className=" p-2 glass mb-2" style={{ backgroundColor: `lch(64% 50 ${data.color} / .7) ` }}>
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
          <p>{`${format(data.start, 'EEEE')} of week ${differenceInWeeks(data.start, env.NEXT_PUBLIC_SEMESTER_START) + 1}`}
        </p>
        </div>}
        <div>
          <p>Due: {new Date(data.due).toLocaleDateString()} at {new Date(data.due).toLocaleTimeString()}</p>
          <p>{format(data.due, 'EEEE')} of week {differenceInWeeks(data.due, env.NEXT_PUBLIC_SEMESTER_START) + 1}</p>
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