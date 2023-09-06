//  input: string
//  output: array of strings
//  rules: 
//    explicit requirements:
//      1. substrings of length >= 2
//      2. including whitespace and non-alpha characters
//      3. case sensitive (e.g. "Mom" is not a palindrome)
//      4. empty string input returns empty array
//      5. non-string input returns undefined
//      2
//      4, 6
//      8, 10, 12
//      14, 16, 18, 20
//      22, 24, 26, 28, 30
//      32, 34, 36, 38, 40, 42
//      44, 46, 48, 50, 52, 54, 56,
//      58, 60, 62, 64, 66, 68, 70, 72 = 520
function sumIncreasingEvenRows(rowNumber) {
  let rowStart = 2;
  for (let row = 1; row <= rowNumber; row += 1) {
    rowStart += ((row - 1) * 2);
  }
  let returnValue = 0;
  for (let termNumber = 0; termNumber < rowNumber; termNumber += 1) {
    returnValue += rowStart + (termNumber * 2);
  }
  return returnValue;
}

console.log(sumIncreasingEvenRows(8000));

function sumIncreasingEvenRows2(rowNumber) {
  let resultStructure = [];
  let place = 0;
  for (let row = 1; row <= rowNumber; row += 1) {
    let rowEntry = [];
    for (let entry = 0; entry < row; entry += 1) {
      place += 2;
      rowEntry.push(place);
    }
    resultStructure.push(rowEntry);
  }
  return resultStructure[rowNumber - 1].reduce((val, acc) => acc += val, 0);
}

console.log(sumIncreasingEvenRows2(8000));
