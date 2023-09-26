import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string(),
  PASSWORD: z.string(),
});

export const env = schema.parse(process.env);
