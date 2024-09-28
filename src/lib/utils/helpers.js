export function capitalizeString(str, limit = str.length) {
  if (!str || typeof str !== "string" || typeof limit !== "number") {
    return "";
  }

  const formattedString =
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return formattedString.slice(0, limit);
}


export const getSuffix = (date) => {
  if (date % 10 === 1 && date !== 11) return "st";
  if (date % 10 === 2 && date !== 12) return "nd";
  if (date % 10 === 3 && date !== 13) return "rd";
  return "th";
};