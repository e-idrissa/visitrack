import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function UserMessage(createdAt: Date): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMilliseconds = now.getTime() - createdDate.getTime();

  // Convert milliseconds to days
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return `Since ${diffInDays} day${diffInDays !== 1 ? "s" : ""}`;
  } else if (diffInDays >= 7 && diffInDays < 30) {
    const diffInWeeks = Math.ceil(diffInDays / 7);
    return `Since ${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""}`;
  } else if (diffInDays >= 30 && diffInDays < 365) {
    const diffInMonths = Math.ceil(diffInDays / 30);
    return `Since ${diffInMonths} week${diffInMonths !== 1 ? "s" : ""}`;
  } else {
    return "Since years";
  }
}
