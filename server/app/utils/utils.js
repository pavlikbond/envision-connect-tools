export function convertToAscii(inputString) {
  //remove non ascii characters
  const asciiString = inputString.replace(/[^\x00-\x7F]/g, "");
  return asciiString;
}

export function removeExtraPeriods(inputString) {
  // Use a regular expression to replace consecutive periods with a single period
  var cleanedString = inputString.replace(/\.{2,}/g, ".");

  return cleanedString;
}
