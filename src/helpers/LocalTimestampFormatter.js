/**
 * Currently not in use but may be useful later 
 * Local DateTime Formatter (Frontend)
 * 
 * @param {Date | string | number | null} inputTime
 * @param {{
 *   format?: 'iso' | 'bd' | 'bd-ddmmyyyy' | 'readable',
 *   type?: 'datetime' | 'date' | 'time'
 * }} options
 * @returns {string}
 */
export const dateTimeFormatter = (inputTime = null, options = {}) => {
  const {
    format = "bd",
    type = "datetime", // default: date + time
  } = options;

  // Use provided time or now
  const date = inputTime ? new Date(inputTime) : new Date();

  // Convert to Bangladesh time
  const bdDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  const year = bdDate.getFullYear();
  const month = String(bdDate.getMonth() + 1).padStart(2, "0");
  const day = String(bdDate.getDate()).padStart(2, "0");
  const hours = String(bdDate.getHours()).padStart(2, "0");
  const minutes = String(bdDate.getMinutes()).padStart(2, "0");
  const seconds = String(bdDate.getSeconds()).padStart(2, "0");

  // Helpers
  const datePart = {
    bd: `${year}-${month}-${day}`,
    "bd-ddmmyyyy": `${day}-${month}-${year}`,
    readable: bdDate.toLocaleDateString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
  };

  const timePart = `${hours}:${minutes}:${seconds}`;

  // Return based on type
  if (type === "date") return datePart[format] || datePart.bd;
  if (type === "time") return timePart;

  // Default: datetime
  if (format === "iso") {
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+06:00`;
  }

  if (format === "readable") {
    return bdDate.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return `${datePart[format] || datePart.bd} ${timePart}`;
};
