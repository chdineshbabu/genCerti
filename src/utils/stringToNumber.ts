/**
 * Encrypt: Convert string to numbers
 * @param input - The string to encrypt
 * @returns The encrypted string as numbers separated by dots
 */
export function encryptStringToNumbers(input: string): string {
    return input
        .split('') // Split string into characters
        .map(char => char.charCodeAt(0)) // Convert each character to ASCII code
        .join('.'); // Join ASCII codes with a delimiter
}

/**
 * Decrypt: Convert numbers back to string
 * @param encrypted - The encrypted string of numbers
 * @returns The decrypted string
 */
export function decryptNumbersToString(encrypted: string): string {
    return encrypted
        .split('.') // Split numbers using the delimiter
        .map(num => String.fromCharCode(Number(num))) // Convert ASCII codes back to characters
        .join(''); // Combine characters into a string
}

// Example usage (commented out as it's just for demonstration)
/*
const originalString = "HelloWorld123!";
const encrypted = encryptStringToNumbers(originalString);
console.log("Encrypted:", encrypted);

const decrypted = decryptNumbersToString(encrypted);
console.log("Decrypted:", decrypted);
*/ 