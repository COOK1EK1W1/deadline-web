"use client";
import { PiNotePencilBold } from "react-icons/pi";
import DateIco from "./date";
import DeadlineCard from "./deadlineCard";
import EditForm from "./editForm";
import { useState } from "react";
import { Deadline } from "@prisma/client";

export default function Modal({ semStart, deadlines, today }: { semStart: Date, deadlines: (Deadline | undefined)[], today: Date; }) {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<Deadline>({} as Deadline);

  function handleClickEdit(data: Deadline) {
    setDeadline(data);
    setShowEditForm(true);
  }

  function handleClickCreate() {
    setDeadline({
      name: "",
      subject: "",
      start: null,
      due: today,
      mark: 0,
      room: "",
      url: "",
      info: "",
      color: 1,
    });
    setShowEditForm(true);
  }

  return (
    <div className="m-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between">
        <DateIco date={today} showDay={false} />

        {!showEditForm && <button type="button" className="bg-green-300 hover:bg-blue-400 rounded-full m-1 p-1 w-40" onClick={handleClickCreate}>
          <PiNotePencilBold style={{ display: "inline" }} /> Create New
        </button>}
      </div>

      <div className="h-[53vh] overflow-y-auto">
        {showEditForm && <EditForm hide={() => setShowEditForm(false)} initialData={deadline} />}

        {deadlines
          .filter((deadline): deadline is Deadline => !!deadline)
          .map((deadline) => (
            <DeadlineCard
              key={`${deadline.name}-${deadline.subject}`}
              data={deadline}
              semStart={semStart}
              handleEdit={handleClickEdit}
            />
          ))}

        {(deadlines
          .filter((deadline): deadline is Deadline => !!deadline)
          .length == 0
        ) && !showEditForm && (
            <div className="flex justify-center p-8">No Deadlines!!</div>
          )}
      </div>
    </div>
  );
}