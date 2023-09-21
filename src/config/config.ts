import { z } from "zod";
import { parseISO } from "date-fns";

const env = z.object({
  DATABASE_URL: z.string(),
  PASSWORD: z.string(),
  START_DATE: z.string()
    .transform((value) => parseISO(value))
    .refine((value) => !isNaN(value.valueOf()), "Date Format: yyyy-MM-DDTHH:mm:ss"),
  SEMESTER_START: z.string()
    .transform((value) => parseISO(value))
    .refine((value) => !isNaN(value.valueOf()), "Date Format: yyyy-MM-DDTHH:mm:ss"),
  TOTAL_WEEKS: z.coerce.number()
}).parse(process.env);

const config = {
  ...env
} as const;

export default config;