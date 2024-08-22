"use client";
import { useModalData, useModalMutators } from "./modalProvider";
import { PiNotePencilBold } from "react-icons/pi";
import { useState } from "react";
import { useDeadlines } from "../deadlines";
import CourseCard from "./courseCard";
import CourseEditForm from "./courseEditForm";

export default function CourseModal() {
  const [isEditFormChanged, setIsEditFormChanged] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const { showCoverCourse, showModalCourse } = useModalData();
  const { closeModalCourse } = useModalMutators();
  const { programme } = useDeadlines();
  // no longer need to keep track of oldData and newData
  // as the Form component will not alter the oldData at all
  // and internally keeps track of the newData which can then be accessed
  // in its submit handler
  const [course, setCourse] = useState<string | null>(null);


  //close modal on esc
  if (typeof window !== "undefined") {
    document.addEventListener("keydown", (event) => {
      if (event.key == "Escape") {
        closeModalCourse();
      }
    });
  }

  // set deadline to default values before opening editForm for CREATING a new deadline
  function handleOpenFormForCreate() {
    setCourse(null);
    setShowEditForm(true);
    setIsEditFormChanged(false);
  }

  // set deadline to existing data before opening editForm for EDITING existing deadline
  function handleOpenFormForEdit(id: string) {
    setCourse(id);
    setShowEditForm(true);
    setIsEditFormChanged(false);
  }

  function handleSubmitEditForm() {
    setShowEditForm(false);
    setIsEditFormChanged(false);
    closeModalCourse();
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
      closeModalCourse();
    }
  }

  return (
    <div
      className={`modalCover fixed top-0 right-0 w-full h-full ${showModalCourse && "active"} ${showCoverCourse && "hidden"}`}
      onClick={handleCloseModal}
    >
      <div className="flex w-full h-full justify-center">
        <div className="modalCard bg-white dark:bg-slate-800 rounded-3xl border-2 dark:border-slate-700">
          <div className="m-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between">
              <h2 className="pl-4 text-xl pb-2">{programme?.title}</h2>

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
              {showEditForm && (
                <CourseEditForm
                  onClose={handleCloseEditForm}
                  onChange={() => setIsEditFormChanged(true)}
                  onSubmit={handleSubmitEditForm}
                  courseCode={course}
                />
              )}
            <div className="h-[53vh] overflow-y-auto">
              {programme?.courses.map((x, id) =>(
                <CourseCard course={x} key={id} handleEdit={handleOpenFormForEdit}/>

              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
