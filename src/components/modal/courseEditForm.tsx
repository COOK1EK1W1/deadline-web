"use client";
import { AiOutlineClose } from "react-icons/ai";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { Course} from "@prisma/client";
import { Form, Input } from "@/components/form";
import { editCourseAction } from "./formAction";
import { useState, useTransition } from "react";
import Spinner from "@/components/spinner/Spinner";
import { useDeadlines } from '../deadlines/deadlines.context';
import Button from "../button";

type Props = {
  courseCode: string | null;
  onClose: () => void;
  onChange: () => void;
  onSubmit: () => void;
};

export default function CourseEditForm({ onClose, onChange, onSubmit, courseCode }: Props) {
  const [isPending, startTransition] = useTransition();
  const { programme} = useDeadlines();

  let initialData: Course = {
    code: "",
    title: "", 
    D_emoji: "" ,
    color: "",
    programmeCode: programme?.code || "",
    courseInfo: "",
    D_announce_channel: null,
  }

  let [color, setColor] = useState(Number(initialData.color) || 1)

  if (courseCode){
    const courses = programme?.courses.filter((x) => x.code == courseCode)[0]
    if (courses){
      const { code, title, D_emoji, color, programmeCode, courseInfo, D_announce_channel } = courses
      initialData = {code, title, D_emoji, color, programmeCode, courseInfo, D_announce_channel}
    }

  }

  const handleSubmit = async (formData: Course) => {
    startTransition(async () => {
      const response = await editCourseAction(
            formData,
            String(window.prompt("enter the password"))
          )
      if (response) {
        onSubmit();
      } else {
        window.alert("there was an error");
      }
    });
  };



  return (
    <Form
      initialData={initialData}
      color={color}
      onSubmit={handleSubmit}
      onChange={() => onChange()}
    >
      <div className="float-right">
        <AiOutlineClose className="cursor-pointer" onClick={() => onClose()} />
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <Input name="title" label="Title" type="text" required />
          <Input name="code" label="Code" type="text" required/>
        </div>
        <div className="flex flex-wrap md:flex-nowrap w-full">
          <Input name="D_emoji" label="Discord Emoji" type="text" required/>
          <Input name="color" label="Color" type="range" min={0} max={360} onChange={(e)=>{setColor(Number(e))}}/>
        </div>

        <div className="flex flex-wrap md:flex-nowrap">
          {/* TODO create a Textarea component and replace info Input */}
          <Input name="D_announce_channel" label="Info" type="text" />
          <Input name="courseInfo" label="Info" type="text" />
        </div>


        <Button type="submit" className="w-40">
          <span className="pr-2">Submit</span>
            <span className="inline">{isPending ? <Spinner size={20}/> : <PiPaperPlaneTiltBold className="inline"/>}</span>
        </Button>
      </div>
    </Form>
  );
}
