"use client"
import { Course } from "@prisma/client";
import { useTransition } from "react";
import { PiTrashBold, PiPencilBold } from "react-icons/pi";
import { deleteCourseAction } from "./formAction";
import { useModalMutators } from "./modalProvider";

export default function CourseCard({course, key, handleEdit}: {course: Course, key: number, handleEdit: (code: string)=>void}){
  const { closeModalCourse } = useModalMutators();
  const [isPending, startTransition] = useTransition();

  const deleteDeadline = async () => {
    startTransition(async () => {
      const response = await deleteCourseAction(course.code, String(window.prompt("enter the password")));
      if (!response) {
        window.alert("there was an error");
      } else {
        closeModalCourse();
      }
    });
  };


  return (
    <div className=" p-2 glass mb-2" style={{ backgroundColor: `lch(64% 50 ${course.color} / .7) ` }} key={key}>
      <div className="float-right cursor-pointer" onClick={() => { deleteDeadline(); }}><PiTrashBold /></div>
      <div className="float-right cursor-pointer" onClick={() => handleEdit(course.code)}><PiPencilBold></PiPencilBold></div>
      <div className="pb-2">
        <span className="text-2xl">{course.title}</span>
        <span className="w-4 inline-block"></span>
        <span>{course.code}</span>
      </div>
      <div>
        {course.courseInfo}
      </div>
    </div>
  )

}
