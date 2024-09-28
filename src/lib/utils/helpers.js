export function capitalizeString(str, limit = str.length) {
  if (!str || typeof str !== "string" || typeof limit !== "number") {
    return "";
  }

  const formattedString =
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return formattedString.slice(0, limit);
}
