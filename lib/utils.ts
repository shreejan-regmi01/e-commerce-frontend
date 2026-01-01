import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher(
  path: string,
  options?: RequestInit & { next?: NextFetchRequestConfig }
) {
  console.log(`${process.env.API_BASE_URL}${path}`);
  const res = await fetch(`${process.env.API_BASE_URL}${path}`, options);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}
