import { z } from "zod";
import { parseISO } from "date-fns";

const schema = z.object({
  NEXT_PUBLIC_SEMESTER_START: z.string()
    .transform((value) => parseISO(value))
    .refine((value) => !isNaN(value.valueOf()), "Date Format: yyyy-MM-DDTHH:mm:ss"),
});

export const env = schema.parse({
  NEXT_PUBLIC_SEMESTER_START: process.env.NEXT_PUBLIC_SEMESTER_START,
});
