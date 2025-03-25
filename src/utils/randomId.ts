const generatedNumbers: Set<number> = new Set();

export const generateRandom = (): number => {
    let randomNumber: number;

    do {
        randomNumber = Math.floor(10000000000 + Math.random() * 90000000000);
    } while (generatedNumbers.has(randomNumber));
    
    generatedNumbers.add(randomNumber);
    return randomNumber;
}; 