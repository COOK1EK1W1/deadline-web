"use client";
import React from "react";
import Week from "./week";
import Modal from "../modal/modal";
import { addDays, differenceInCalendarWeeks, format } from "date-fns";
import { ModalProvider } from "@/components/modal/modalProvider";
import { useDeadlinesContext } from '@/components/deadlines';
import { env } from '@/config/env/client';

export default function Calendar() {
  const deadlines = useDeadlinesContext();

  const rows = [];
  for (var i = 0; i < env.NEXT_PUBLIC_TOTAL_WEEKS; i++) {
    const dateOfWeek = addDays(env.NEXT_PUBLIC_START_DATE, 7 * i);
    if (env.NEXT_PUBLIC_SEMESTER_START.getTime() <= dateOfWeek.getTime()) {

      rows.push(
        <div key={i * 2}>
          <div className="pl-3">Week {differenceInCalendarWeeks(dateOfWeek, env.NEXT_PUBLIC_SEMESTER_START) + 1} - Beginning {format(dateOfWeek, 'd/M')}</div>

        </div>
      );
    }
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i * 2 + 1} week={i}></Week>
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