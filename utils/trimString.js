const trimString = (string, length = 40) =>
  string.length > length ? string.substring(0, length - 3) + "..." : string;
export default trimString;
