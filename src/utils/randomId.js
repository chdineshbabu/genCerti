const generatedNumbers = new Set()
export const generateRandom=()=>{
    let randomNumber;

    do {
      randomNumber = Math.floor(10000000000 + Math.random() * 90000000000);
    } while (generatedNumbers.has(randomNumber));
    generatedNumbers.add(randomNumber);
    return randomNumber;
}