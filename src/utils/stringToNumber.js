// Encrypt: Convert string to numbers
function encryptStringToNumbers(input) {
    return input
        .split('') // Split string into characters
        .map(char => char.charCodeAt(0)) // Convert each character to ASCII code
        .join('.'); // Join ASCII codes with a delimiter (e.g., '-')
}

// Decrypt: Convert numbers back to string
function decryptNumbersToString(encrypted) {
    return encrypted
        .split('.') // Split numbers using the delimiter
        .map(num => String.fromCharCode(Number(num))) // Convert ASCII codes back to characters
        .join(''); // Combine characters into a string
}

// Example usage
const originalString = "HelloWorld123!";
const encrypted = encryptStringToNumbers(originalString);
console.log("Encrypted:", encrypted);

const decrypted = decryptNumbersToString(encrypted);
console.log("Decrypted:", decrypted);
