export const timeDiffInSecondsAndMinutes = (
  startTime: Date | string,
  endTime: Date | string
): string => {
  if (!startTime || !endTime) {
    return "Invalid";
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffInMs = end.getTime() - start.getTime();

  const diffInSeconds = Math.abs(Math.floor(diffInMs / 1000));

  const minutes = Math.floor(diffInSeconds / 60);

  const seconds = diffInSeconds % 60;

  let result = "";

  if (minutes > 0) {
    result += `${minutes} ${minutes === 1 ? "minute" : "minutes"} `;
  }

  if (seconds > 0) {
    result += `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
  }

  return result.trim();
};
