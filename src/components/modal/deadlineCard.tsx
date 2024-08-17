"use client";
import { differenceInWeeks, format } from "date-fns";
import Link from "next/link";
import { PiTrashBold, PiPencilBold } from "react-icons/pi";
import { useTransition } from "react";
import { deleteAction } from "./formAction";
import { useModalMutators } from "./modalProvider";
import { useDeadlines } from '../deadlines/deadlines.context';
import { env } from '@/config/env/client';

type Props = {
  id: number;
  handleEdit: () => void;
};

export default function DeadlineCard({ id, handleEdit }: Props) {
  const [isPending, startTransition] = useTransition();
  const { closeModalDay } = useModalMutators();
  const { getDeadlineById } = useDeadlines();
  const deadline = getDeadlineById(id);

  const deleteDeadline = async () => {
    startTransition(async () => {
      const response = await deleteAction(deadline.courseCode, String(window.prompt("enter the password")), id);
      if (!response) {
        window.alert("there was an error");
      } else {
        closeModalDay();
      }
    });
  };

  if (!deadline || !deadline.due) return;

  return <div className=" p-2 glass mb-2" style={{ backgroundColor: `lch(64% 50 ${deadline.color} / .7) ` }}>
    <div className="float-right cursor-pointer" onClick={() => { deleteDeadline(); }}><PiTrashBold /></div>
    <div className="float-right cursor-pointer" onClick={() => handleEdit()}><PiPencilBold></PiPencilBold></div>

    <div>
      <div className="pb-2">
        <span className="text-2xl">{deadline.name}</span>
        <span className="w-4 inline-block"></span>
        <span>{deadline.courseCode}</span>
        <span className="w-4 inline-block"></span>
        <span>{deadline.mark}%</span>
      </div>

      <div className="flex flex-wrap justify-start pb-2">
        {deadline.start && <div className="pr-4 pb-4">
          <p>Starts: {format(deadline.start, "Pp")}</p>
          <p>{`${format(deadline.start, 'EEEE')} of week ${differenceInWeeks(deadline.start, env.NEXT_PUBLIC_SEMESTER_START) + 1}`}
          </p>
        </div>}
        <div>
          <p>Due: {new Date(deadline.due).toLocaleDateString()} at {new Date(deadline.due).toLocaleTimeString()}</p>
          <p>{format(deadline.due, 'EEEE')} of week {differenceInWeeks(deadline.due, env.NEXT_PUBLIC_SEMESTER_START) + 1}</p>
        </div>
      </div>

      <div>
        {(!deadline.info && !deadline.room && !deadline.url) && <p className="text-sm">More info will apear here..</p>}
        <p>{deadline.info}</p>
        {(deadline.room) && <p>Location: {deadline.room}</p>}
        {(deadline.url) && <Link href={deadline.url} className="underline hover:no-underline">Spec/Submission</Link>}
      </div>
    </div>
  </div>;
}
