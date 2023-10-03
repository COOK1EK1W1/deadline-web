"use client";

import { useModalMutators } from "@/components/modal/modalProvider";

import { Deadline } from "@prisma/client";
import { addDays } from "date-fns";
import Day from "./day";

export default function Week({
  startOfWeek,
  deadlines,
}: {
  startOfWeek: Date;
  deadlines: (Deadline | null)[][];
}) {

  const rows = [];
  for (let i = 0; i < 7; i++) {
    const dateOfDay: Date = addDays(startOfWeek, i);
    rows.push(
      <Day dateOfDay={dateOfDay} i={i} deadlines={deadlines} key={i}></Day>
    );
  }
  return <div className="week flex pb-4">{rows}</div>;
}
