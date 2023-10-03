"use client";

import { addDays } from "date-fns";
import Day from "./day";

export default function Week({
  startOfWeek,
  week,
}: {
  startOfWeek: Date;
  week: number
}) {

  const rows = [];
  for (let i = 0; i < 7; i++) {
    const dateOfDay: Date = addDays(startOfWeek, i);
    rows.push(
      <Day dateOfDay={dateOfDay} i={i} key={i} week={week} day={i}></Day>
    );
  }
  return <div className="week flex pb-4">{rows}</div>;
}
