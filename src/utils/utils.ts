import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export interface ICommons {
  className?: string;
  children?: React.ReactNode;
}
export function createNewId(min: number = 10, max: number = 100000): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const randomNumber = array[0] / (0xffffffff + 1);
  return Math.floor(randomNumber * (max - min + 1)) + min;
}
