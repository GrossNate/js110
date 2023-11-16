function sumPairs(numbersArr, sum) {
  let possibleSolutions = [];
  for (let i = 0; i < numbersArr.length - 1; i += 1) {
    let numOne = numbersArr[i];
    let remainingNumbersArr = numbersArr.slice(i + 1);
    for (let j = 0; j < remainingNumbersArr.length; j += 1) {
      let numTwo = remainingNumbersArr[j];
      if (numOne + numTwo === sum) {
        possibleSolutions.push([[numOne, numTwo], i + j + 1]);
      }
    }
  }
  // select the lowest index solution
  possibleSolutions.sort((a, b) => a[1] - b[1]);
  return possibleSolutions[0][0];
}

console.log(sumPairs([4, 3, 2, 3, 4], 6));
console.log(sumPairs([10, 5, 2, 3, 7, 5], 10)); // [3, 7]
