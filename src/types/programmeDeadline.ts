import { Course, Deadline, Programme } from "@prisma/client";

export type ProgrammeDeadlines = ({code: string, title: string, year: Date, courses: (Course & {deadlines: Deadline[]})[]}) | null
