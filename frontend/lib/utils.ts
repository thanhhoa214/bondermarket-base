import { type ClassValue, clsx } from 'clsx';
import { format, startOfDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number | BigInt, decimals?: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: decimals ?? 1,
    maximumFractionDigits: decimals ?? 1,
    ...options,
  }).format(Number(value));
}

export const moneyFormatter = (value: number): string => {
  return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const dateFormatter = (date: number | Date) => format(new Date(date), 'MMM dd, yyyy HH:mm');

export const today = startOfDay(new Date());

export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
