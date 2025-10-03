// https://stackoverflow.com/questions/69390216/how-to-properly-join-tailwind-css-classes-using-clsx
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
