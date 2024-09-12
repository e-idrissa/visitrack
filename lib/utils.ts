import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcrypt"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: string) => {
  const dateObject = new Date(date);
  // const day = `${dateObject.toLocaleString().split(",")[0]}`;
  const day = `${dateObject.toDateString()}`;
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${day}, ${hours}:${minutes}`;
};

export async function HashPwd(pwd: string): Promise<string> {
  const saltRound = 10

  return bcrypt.hashSync(pwd, saltRound)
}
