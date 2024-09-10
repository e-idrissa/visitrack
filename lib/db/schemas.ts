import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  pwd: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export const SignupFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  pwd: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  confPwd: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export const NewVisitFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  lastname: z.string().min(3, {
    message: "Last Name must be at least 3 characters.",
  }),
  reason: z.string().min(3, {
    message: "Reason must be at least 3 characters.",
  }),
});

export const EditVisitFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  lastname: z.string().min(3, {
    message: "Last Name must be at least 3 characters.",
  }),
  reason: z.string().min(3, {
    message: "Reason must be at least 3 characters.",
  }),
  status: z.enum(["inProgress","ended"]),
  startingHour: z.string(),
  startingMin: z.string(),
  endingHour: z.string(),
  endingMin: z.string(),
});
