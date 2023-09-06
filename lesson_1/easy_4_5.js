// function runningTotal(numbersArray) {
//   let returnArray = [];
//   let runningTotal = 0;
//   for (let counter = 0; counter < numbersArray.length; counter += 1) {
//     runningTotal += numbersArray[counter];
//     returnArray.push(runningTotal);
//   }
//   return returnArray;
// }

function runningTotal(numbersArray) {
  let runningTotal = 0;
  return numbersArray.map(element => runningTotal += element);
}

console.log(runningTotal([2, 5, 13]));             // [2, 7, 20]
console.log(runningTotal([14, 11, 7, 15, 20]));    // [14, 25, 32, 47, 67]
console.log(runningTotal([3]));                    // [3]
console.log(runningTotal([]));                     // []
