// # Problem
// ## Questions
// * Are all cubes the same size?
// * Are we essentially building a pyramid?
// * To confirm, the layers would be 1, 4, 9, 16, etc. - essentially just the squares?
// * Is the input a number?
// * What should I do with invalid input (negative numbers, non-integers, strings, etc.)?
// * Am I just returning a number?
// ### Explicit rules
// * See rules given in problem statement
// ### Implicit rules
// * input is a positive integer number
// * output will also be a non-negative integer number
// * the most efficient way of building under these rules will be a solid, four-sided pyramid
// * layer number ** 2 = number of blocks in the layer
// # Examples/Test Cases
// * as given in the problem statement
// * answers the question that we can accept 0 as an input
// * confirms that we're returning an integer number.
// # Data Structures
// * Could use an array but don't really need to.
// # Algorithm
// * In a loop starting at 1 and continuing until the square of the number is greater than the remaining number of blocks
//    * subtract the square of the number from the remaining blocks
// * return the number of blocks remaining
// # Code
//

function calculateLeftoverBlocks(blocksAvailable) {
  let rowNumber = 0;
  while (rowNumber ** 2 <= blocksAvailable) {
    blocksAvailable -= rowNumber ** 2;
    rowNumber += 1;
  }
  return blocksAvailable;
}

console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true
