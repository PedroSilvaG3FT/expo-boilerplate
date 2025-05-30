import { z } from "zod";

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string(),
  EXPO_PUBLIC_API_KEY: z.string(),
});

export const enviroments = schema.parse(process.env);
