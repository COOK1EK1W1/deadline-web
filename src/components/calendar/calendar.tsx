import React from "react";
import Week from "./week";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const TOTAL_WEEKS = 12 + 2;
const totalWeeksIndexes = Array.from(Array(TOTAL_WEEKS).keys());

export default function Calendar() {
  return (
    <div className="calendar">
      <div className="week flex sticky top-0 py-2 glass">
        {DAYS.map((day) => (
          <div className="w-full text-center" key={day}>{day}</div>
        ))}
      </div>

      {totalWeeksIndexes.map((numWeek) => (
        <Week key={numWeek} week={numWeek} />
      ))}
    </div>
  );
}
