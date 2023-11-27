import { format, isToday } from "date-fns";

type Props = {
  date: Date;
  showDay: boolean;
}

export default function DateIco({ date, showDay }: Props) {
  return (
    <div className={`${
        date.getDate() == 1 && !showDay
          ? "w-24"
          : date.getDate() == 1 || !showDay
          ? "w-20"
          : "w-8"
      } m-1 p-1 text-center rounded-full ${
        isToday(date) ? "bg-red-300 dark:bg-red-600" : "hbg"
      }`}>
      {!showDay && format(date, "eee")} {date.getDate()}{" "}
      {date.getDate() == 1 && format(date, "MMM")}
    </div>
  );
}
