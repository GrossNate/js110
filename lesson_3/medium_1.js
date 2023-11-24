console.log("Rotation (Part 1)");
function rotateArray(arr) {
  if (!Array.isArray(arr)) return undefined;
  if (arr.length === 0) return [];
  let returnArr = arr.slice();
  returnArr.push(returnArr.shift());
  return returnArr;
}

console.log(rotateArray([7, 3, 5, 2, 9, 1])); // [3, 5, 2, 9, 1, 7]
console.log(rotateArray(["a", "b", "c"])); // ["b", "c", "a"]
console.log(rotateArray(["a"])); // ["a"]
console.log(rotateArray([1, "a", 3, "c"])); // ["a", 3, "c", 1]
console.log(rotateArray([{ a: 2 }, [1, 2], 3])); // [[1, 2], 3, { a: 2 }]
console.log(rotateArray([])); // []

// return `undefined` if the argument is not an array
console.log(rotateArray()); // undefined
console.log(rotateArray(1)); // undefined

// the input array is not mutated
let array = [1, 2, 3, 4];
console.log(rotateArray(array)); // [2, 3, 4, 1]
console.log(array); // [1, 2, 3, 4]

console.log();
console.log("Rotation (Part 2)");
/*
 * Test cases:
 *    count === number.length
 *    count === 1
 *    count > number.length
 */
function rotateString(string) {
  return string.slice(1).concat(string[0]);
}

function rotateRightmostDigits(number, count) {
  let numberString = number.toString();
  if (count > numberString.length) return undefined;
  return numberString
    .substring(0, numberString.length - count)
    .concat(rotateString(numberString.slice(numberString.length - count)))
    .valueOf();
}
console.log(rotateRightmostDigits(735291, 1)); // 735291
console.log(rotateRightmostDigits(735291, 2)); // 735219
console.log(rotateRightmostDigits(735291, 3)); // 735912
console.log(rotateRightmostDigits(735291, 4)); // 732915
console.log(rotateRightmostDigits(735291, 5)); // 752913
console.log(rotateRightmostDigits(735291, 6)); // 352917

console.log();
console.log("Rotation (Part 3)");
function maxRotation(number) {
  let digits = number.toString().length;
  for (let i = digits; i > 0; i -= 1) {
    number = rotateRightmostDigits(number, i);
  }
  return number;
}

console.log(maxRotation(735291)); // 321579
console.log(maxRotation(3)); // 3
console.log(maxRotation(35)); // 53
console.log(maxRotation(105)); // 15 -- the leading zero gets dropped
console.log(maxRotation(8703529146)); // 7321609845

console.log();
console.log("Stack Machine Interpretation");
function minilang(instructionString) {
  let instructionArray = instructionString.split(" ");
  let stack = [];
  let register = 0;
  console.log();
  for (let i = 0; i < instructionArray.length; i += 1) {
    let instruction = instructionArray[i];
    if (!Number.isNaN(Number(instruction))) {
      register = Number(instruction);
    } else if (instruction === "PUSH") {
      stack.push(register);
    } else if (instruction === "ADD") {
      register = register + stack.pop();
    } else if (instruction === "SUB") {
      register = register - stack.pop();
    } else if (instruction === "MULT") {
      register = register * stack.pop();
    } else if (instruction === "DIV") {
      register = Math.floor(register / stack.pop());
    } else if (instruction === "REMAINDER") {
      register = register % stack.pop();
    } else if (instruction === "POP") {
      register = stack.pop();
    } else if (instruction === "PRINT") {
      console.log(register);
    }
  }
}

minilang("PRINT");
// 0

minilang("5 PUSH 3 MULT PRINT");
// 15

minilang("5 PRINT PUSH 3 PRINT ADD PRINT");
// 5
// 3
// 8

minilang("5 PUSH POP PRINT");
// 5

minilang("3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT");
// 5
// 10
// 4
// 7

minilang("3 PUSH PUSH 7 DIV MULT PRINT");
// 6

minilang("4 PUSH PUSH 7 REMAINDER MULT PRINT");
// 12

minilang("-3 PUSH 5 SUB PRINT");
// 8

minilang("6 PUSH");
// (nothing is printed because the `program` argument has no `PRINT` commands)

console.log();
console.log("Word to Digit");
function wordToDigit(string) {
  const numbers = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return numbers.reduce(
    (returnString, number, index) =>
      returnString.replace(RegExp(`\\b${number}\\b`, "gi"), index),
    string,
  );
}

console.log(
  wordToDigit("Please call me at five five five one two three four. Thanks."),
);
// "Please call me at 5 5 5 1 2 3 4. Thanks."
console.log(wordToDigit("The weight is done.")); // "The weight is done."
console.log(wordToDigit("The number (eight) is done.")); // "The number (8) is done."

console.log();
console.log("Fibonacci Number Location By Length");
function findFibonacciIndexByLength(targetDigits) {
  let n = 1n;
  let nMinusOne = 0n;
  let iterations = 1;
  while (String(n).length < targetDigits) {
    iterations += 1;
    let fibonacci = n + nMinusOne;
    nMinusOne = n;
    n = fibonacci;
  }
  return iterations;
}

console.log(findFibonacciIndexByLength(2n) === 7); // 1 1 2 3 5 8 13
console.log(findFibonacciIndexByLength(3n) === 12); // 1 1 2 3 5 8 13 21 34 55 89 144
console.log(findFibonacciIndexByLength(10n) === 45);
console.log(findFibonacciIndexByLength(16n) === 74);
console.log(findFibonacciIndexByLength(100n) === 476);
console.log(findFibonacciIndexByLength(1000n) === 4782);
// console.log(findFibonacciIndexByLength(10000n) === 47847);
// The last example may take a minute or so to run.

console.log();
console.log("Fibonacci Numbers (Recursion)");
function fibonacci(n) {
  if (n <= 2) return 1n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(1)); // 1
console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(12)); // 144
// console.log(fibonacci(7500));      // 6765

console.log();
console.log("Fibonacci Numbers (Procedural)");
function fibonacciProcedural(n) {
  let currentN = 1n;
  let nMinusOne = 0n;
  let newNMinusOne;
  for (let i = 1; i < n; i += 1) {
    newNMinusOne = currentN;
    currentN += nMinusOne;
    nMinusOne = newNMinusOne;
  }
  return currentN;
}

console.log(fibonacciProcedural(20)); // 6765
console.log(fibonacciProcedural(50)); // 12586269025
console.log(fibonacciProcedural(75)); // 2111485077978050

console.log();
console.log("Fibonacci Numbers (Memoization)");
function fibMemo(n) {
  let memo = [];
  function fib(n) {
    if (n <= 2) {
      return 1n;
    } else if (memo[n] === undefined) {
      memo[n] = fib(n - 1) + fib(n - 2);
    }
    return memo[n];
  }
  return fib(n);
}

console.log(fibMemo(20)); // 6765
console.log(fibMemo(50)); // 12586269025
console.log(fibMemo(75)); // 2111485077978050
console.log(fibMemo(7500));
