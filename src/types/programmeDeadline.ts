import { Course, Deadline, Programme } from "@prisma/client";

export type ProgrammeDeadlines = (Programme & {courses: (Course & {deadlines: Deadline[]})[]}) | null
