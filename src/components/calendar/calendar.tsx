import React from "react";
import Week from "./week";
import Modal from "../modal/modal";
import { addDays } from "date-fns";
import { ModalProvider } from "@/components/modal/modalProvider";
import { env } from '@/config/env/client';

export default function Calendar() {
  const rows = [];
  for (var i = 0; i < env.NEXT_PUBLIC_TOTAL_WEEKS; i++) {
    const startOfWeek = addDays(env.NEXT_PUBLIC_START_DATE, 7 * i);
    
    rows.push(
      <Week startOfWeek={startOfWeek} key={i} week={i}></Week>
    );
  }

  return <>
    <div className="calendar">
      <div className="week flex sticky top-0 py-2 glass">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div className="w-full text-center" key={i}>{day}</div>

        ))}
      </div>
      <ModalProvider modal={<Modal />}>
        {rows}
      </ModalProvider>
    </div>
  </>;

}