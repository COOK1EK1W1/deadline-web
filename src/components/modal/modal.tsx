"use client";
import { PiNotePencilBold } from "react-icons/pi";
import DateIco from "@/app/date";
import DeadlineCard from "./deadlineCard";
import EditForm from "@/app/editForm";
import { useContext, useState } from "react";
import { Deadline } from "@prisma/client";
import { Context } from "@/app/calendar";

export default function Modal({ semStart, deadlines, today }: { semStart: Date, deadlines: (Deadline | null)[], today: Date; }) {
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { closeModal, showCover, showModal } = useContext(Context)

  // no longer need to keep track of oldData and newData
  // as the Form component will not alter the oldData at all
  // and internally keeps track of the newData which can then be accessed
  // in its submit handler
  const [deadline, setDeadline] = useState<Deadline>({} as Deadline);

  // set deadline to default values before opening editForm for CREATING a new deadline
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

  // set deadline to existing data before opening editForm for EDITING existing deadline
  function handleClickEdit(data: Deadline) {
    setDeadline(data);
    setShowEditForm(true);
  }

  return (
    <div className={`modalCover ${showModal && "active"} ${showCover && "hidden"}`} onClick={() => { closeModal(); }}>
      <div className="flex w-full h-full justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-3xl modalCard">
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
                .filter((deadline): deadline is Deadline => !!deadline) // filter out all deadlines which are null
                .map((deadline) => (
                  <DeadlineCard
                    key={`${deadline.name}-${deadline.subject}`}
                    data={deadline}
                    semStart={semStart}
                    handleEdit={() => handleClickEdit(deadline)}
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
        </div>
      </div>
    </div>
  );
}