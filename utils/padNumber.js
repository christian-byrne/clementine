
export function padNumber(number, targetWidth) {
    // If number is falsy, return targetWidth spaces
    if (!number) return " ".repeat(targetWidth);

    let formattedNumber = "";
    // Check if the number is greater than 1000
    if (number >= 1000) {
        // Divide by 1000 and round to two decimal places
        const dividedNumber = (number / 1000).toFixed(1);
        // Add commas if necessary after dividing by 1000
        formattedNumber = addCommas(dividedNumber);
        // Append "k" to indicate thousands
        formattedNumber += "k";
    } else {
        // If the number is less than or equal to 1000, no need for division
        formattedNumber = String(number);
    }

    // Pad the formatted number with spaces to reach the target width
    return formattedNumber.padStart(targetWidth, " ");
};

function addCommas(numberString) {
    // Split the number string into integer and decimal parts
    const [integerPart, decimalPart] = numberString.split(".");
    // Add commas to the integer part
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Combine integer part with decimal part, if any
    return decimalPart ? `${integerWithCommas}.${decimalPart}` : integerWithCommas;
}

