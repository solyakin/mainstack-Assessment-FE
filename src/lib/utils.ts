import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TransactionType } from "../constant/global";

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

export const getChatRecords = (tnx: TransactionType[]) => {
  return tnx.map(item => ({
    date: item.date,
    amount: item.amount,
  }));
};

export const getDateRange = (chartData: ReturnType<typeof getChatRecords>) => {
    if (!chartData || chartData.length === 0) {
      return { minDate: null, maxDate: null };
    }

    const dates = chartData.map(item => new Date(item.date));
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));

    return { minDate, maxDate };
};

export const formatDateForDisplay = (date: Date | null) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
  });
};
