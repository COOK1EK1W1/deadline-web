"use client";

import DateIco from "@/components/date";
import DeadlineCard from "./deadlineCard";
import EditForm from "./editForm";
import { useModalData, useModalMutators } from "./modalProvider";

import { PiNotePencilBold } from "react-icons/pi";
import { useState } from "react";

export default function DayModal() {
  const [isEditFormChanged, setIsEditFormChanged] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { showCoverDay, showModalDay, modalDeadlines } = useModalData();
  const { closeModalDay } = useModalMutators();

  //close modal on esc
  if (typeof window !== "undefined") {
    document.addEventListener("keydown", (event) => {
      if (event.key == "Escape") {
        closeModalDay();
      }
    });
  }

  // no longer need to keep track of oldData and newData
  // as the Form component will not alter the oldData at all
  // and internally keeps track of the newData which can then be accessed
  // in its submit handler
  const [deadline, setDeadline] = useState<number | null>(null);

  // set deadline to default values before opening editForm for CREATING a new deadline
  function handleOpenFormForCreate() {
    setDeadline(null);
    setShowEditForm(true);
    setIsEditFormChanged(false);
  }

  // set deadline to existing data before opening editForm for EDITING existing deadline
  function handleOpenFormForEdit(id: number) {
    setDeadline(id);
    setShowEditForm(true);
    setIsEditFormChanged(false);
  }

  function handleSubmitEditForm() {
    setShowEditForm(false);
    setIsEditFormChanged(false);
    closeModalDay();
  }

  function shouldCloseEditForm() {
    return !isEditFormChanged || window.confirm("Discard changes?");
  }

  function handleCloseEditForm() {
    const closeEditForm = shouldCloseEditForm();
    if (closeEditForm) {
      setShowEditForm(false);
      setIsEditFormChanged(false);
    }
  }

  function handleCloseModal() {
    const closeEditForm = shouldCloseEditForm();
    if (closeEditForm) {
      setShowEditForm(false);
      setIsEditFormChanged(false);
      closeModalDay();
    }
  }

  return (
    <div
      className={`modalCover fixed top-0 right-0 w-full h-full ${showModalDay && "active"} ${showCoverDay && "hidden"}`}
      onClick={handleCloseModal}
    >
      <div className="flex w-full h-full justify-center">
        <div className="modalCard bg-white dark:bg-slate-800 rounded-3xl border-2 dark:border-slate-700">
          <div className="m-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between">
              <DateIco date={modalDeadlines.date} showDay={false} />

              {!showEditForm && (
                <button
                  type="button"
                  className="bg-green-300 hover:bg-blue-400 dark:bg-green-600 rounded-full m-1 p-1 w-40"
                  onClick={handleOpenFormForCreate}
                >
                  <PiNotePencilBold style={{ display: "inline" }} /> Create New
                </button>
              )}
            </div>

            <div className="h-[53vh] overflow-y-auto">
              {showEditForm && (
                <EditForm
                  onClose={handleCloseEditForm}
                  onChange={() => setIsEditFormChanged(true)}
                  onSubmit={handleSubmitEditForm}
                  deadlineId={deadline}
                  dateOfDay={modalDeadlines.date}
                />
              )}

              {modalDeadlines.deadlines
                .filter((deadlineId): deadlineId is number => deadlineId !== null) // filter out all deadlines which are null
                .map((deadlineId) => (
                  <DeadlineCard
                    key={deadlineId}
                    id={deadlineId}
                    handleEdit={() => handleOpenFormForEdit(deadlineId)}
                  />
                ))}

              {modalDeadlines.deadlines.filter((deadline): deadline is number => !!deadline).length == 0 &&
                !showEditForm && (
                  <div className="flex justify-center p-8">No Deadlines!!</div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
