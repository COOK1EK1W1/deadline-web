import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_SEMESTER_START: z.string().date(),
});

export const env = schema.parse(process.env);
