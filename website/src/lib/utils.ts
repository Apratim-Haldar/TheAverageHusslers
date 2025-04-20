import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 * @param inputs - Class names or conditional class name objects
 * @returns Merged class string with resolved Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a readable string
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-US", options).format(date)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

/**
 * Generates a random ID
 * @returns Random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
