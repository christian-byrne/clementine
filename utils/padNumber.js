export function padNumber(number, targetWidth, justify = "center") {
  if (!number) return " ".repeat(targetWidth);

  // if number is a string but represents a number, convert to number
  if (
    typeof number === "string" &&
    isFinite(number) &&
    !isNaN(parseFloat(number))
  ) {
    number = Number(number);
  }

  const powerLabels = ["", "k", "M", "B", "T", "Q"];
  let curNumber = number;
  let labelIndex = 0;
  while (curNumber >= 1000 && labelIndex < powerLabels.length) {
    curNumber /= 1000;
    labelIndex++;
  }

  let roundTo = targetWidth - 2;
  let needComma = false;
  if (Math.floor(curNumber).toString().length > 3) {
    roundTo--;
    needComma = true;
  }

  let numberString = curNumber.toFixed(roundTo).toString();
  numberString = replaceTrailingZeros(
    numberString,
    numberString.length - 1,
    justify
  );
  if (needComma) {
    numberString =
      numberString.substring(0, 3) + "," + numberString.substring(3);
  }
  numberString += powerLabels[labelIndex];
  return numberString;
}

function replaceTrailingZeros(numberString, index, justify) {
  if (!numberString || index <= 0) {
    return numberString + " ";
  }
  if (numberString.charAt(index) == ".") {
    return (
      numberString.substring(0, index) + " " + numberString.substring(index + 1)
    );
  }
  if (numberString.charAt(index) != "0") {
    return numberString;
  }

  if ((justify === "center" && index % 2 === 0) || justify === "right") {
    return replaceTrailingZeros(
      numberString.substring(0, index) +
        " " +
        numberString.substring(index + 1),
      index - 1,
      justify
    );
  } else {
    return replaceTrailingZeros(
      " " +
        numberString.substring(0, index) +
        numberString.substring(index + 1),
      index,
      justify
    );
  }
}
