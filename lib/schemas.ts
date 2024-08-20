import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  pwd: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});
