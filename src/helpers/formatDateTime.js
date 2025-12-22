/**
 * Simple Local Date/Time Formatter (Asia/Dhaka)
 *
 * @param {Date | string | number | null} value
 * @param {'datetime' | 'date' | 'time'} type
 * @returns {string}
 */

export default function formatDateTime(value = null, type = "datetime") {
  const date = value ? new Date(value) : new Date();

  return date.toLocaleString("en-BD", {
    timeZone: "Asia/Dhaka",
    year: type !== "time" ? "numeric" : undefined,
    month: type !== "time" ? "short" : undefined,
    day: type !== "time" ? "2-digit" : undefined,
    hour: type !== "date" ? "2-digit" : undefined,
    minute: type !== "date" ? "2-digit" : undefined,
    second: type !== "date" ? "2-digit" : undefined,
    hour12: false,
  });
};
