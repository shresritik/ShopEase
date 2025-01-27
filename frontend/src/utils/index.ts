/**
 *
 * @param value
 * @returns decimal value upto two places
 */
export const roundOff = (value: number) => {
  return Math.round(value * 100) / 100;
};
// converts timezone to readable format
export const timezone = (time: Date) => {
  const isoString = time;
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
// get previous date in ISO format
export const convertToISO = (date: number) => {
  return new Date(Date.now() - date * 24 * 60 * 60 * 1000).toISOString();
};
