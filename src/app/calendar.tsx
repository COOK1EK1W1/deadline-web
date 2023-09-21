"use client";
import React from "react";
import Week from "./week";
import Modal from "../components/modal/modal";
import { Deadline } from "@prisma/client";
import { addDays, differenceInCalendarWeeks, format } from "date-fns";
import { ModalProvider } from "@/components/modal/modalProvider";
import { useDeadlinesContext } from '@/components/deadlines';

export default function Calendar({ startDate, semesterStart, weeks, deadlines }: { startDate: Date, semesterStart: Date, weeks: number, deadlines: (Deadline | null)[][]; }) {
  const deadlines2 = useDeadlinesContext();

  const rows = [];
  for (var i = 0; i < weeks; i++) {
    const dateOfWeek = addDays(startDate, 7 * i);
    if (semesterStart.getTime() <= dateOfWeek.getTime()) {

      rows.push(
        <div key={i * 2}>
          <div className="pl-3">Week {differenceInCalendarWeeks(dateOfWeek, semesterStart) + 1} - Beginning {format(dateOfWeek, 'd/M')}</div>

        </div>
      );
    }
    rows.push(
      <Week startOfWeek={dateOfWeek} key={i * 2 + 1} deadlines={deadlines2.slice(0 + i * 7, 7 + i * 7)}></Week>
    );
  }

  return <>
    <div className="calendar">
      <div className="week flex sticky top-0 py-2 glass">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div className="w-full text-center" key={i}>{day}</div>

        ))}
      </div>
      <ModalProvider modal={(
        <Modal semStart={semesterStart} />
      )}>
        {rows}

      </ModalProvider>
    </div>
  </>;

}