function doubleOddNumbers(numbersArray) {
  let doubledOddIndexNumbers = [];
  for (let counter = 0; counter < numbersArray.length; counter += 1) {
    doubledOddIndexNumbers.push(counter % 2 === 0 ? numbersArray[counter] : numbersArray[counter] * 2);
  }
  return doubledOddIndexNumbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doubleOddNumbers(myNumbers));  // => [2, 4, 6, 14, 2, 6]

// not mutated
console.log(myNumbers);                    // => [1, 4, 3, 7, 2, 6]
