
export function padNumber(number, targetWidth) {
    // If number is falsy, return targetWidth spaces
    if (!number) return " ".repeat(targetWidth);
    if (number > 1000) {
        const formattednumber = (number / 1000).toFixed(1) + "k";
        return formattednumber.padStart(targetWidth, " ");
    } else {
        return String(number).padStart(targetWidth, " ");
    }
};