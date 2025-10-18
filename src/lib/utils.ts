import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
  };
  return date.toLocaleDateString('en-US', options).replace(/(\w+) (\d+), (\d+)/, '$1, $2 $3');
};

export const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}