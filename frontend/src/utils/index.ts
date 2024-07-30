export const roundOff = (value: number) => {
  return Math.round(value * 100) / 100;
};
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
