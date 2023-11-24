console.log("List Processing > Sum of Digits");
function sum(numberToSum) {
  return numberToSum
    .toString()
    .split("")
    .reduce((accum, elem) => accum + Number(elem), 0);
}

console.log(sum(23)); // 5
console.log(sum(496)); // 19
console.log(sum(123456789)); // 45

console.log();
console.log("List Processing > Alphabetical Numbers");
const numberMap = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
};
function alphabeticNumberSort(numbersArr) {
  return numbersArr.slice().sort((a, b) => {
    if (numberMap[a] > numberMap[b]) {
      return 1;
    } else if (numberMap[a] < numberMap[b]) {
      return -1;
    } else {
      return 0;
    }
  });
}

console.log(alphabeticNumberSort(
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
));
// [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]

console.log();
console.log("List Processing > Multiply All Pairs");
function multiplyAllPairs(arrOne, arrTwo) {
  return arrOne
    .flatMap((numOne) => arrTwo.map((numTwo) => numOne * numTwo))
    .sort((a, b) => a - b);
}

console.log(multiplyAllPairs([2, 4], [4, 3, 1, 2])); // [2, 4, 4, 6, 8, 8, 12, 16]

console.log();
console.log("Leading Substrings");
function leadingSubstrings(string) {
  return string
    .split("")
    .map((_, index, array) => array.slice(0, index + 1).join(""));
}
console.log(leadingSubstrings("abc")); // ["a", "ab", "abc"]
console.log(leadingSubstrings("a")); // ["a"]
console.log(leadingSubstrings("xyzzy")); // ["x", "xy", "xyz", "xyzz", "xyzzy"]

console.log();
console.log("All Substrings");
function substrings(inputString) {
  let substringArr = [];
  for (let i = 0; i < inputString.length; i += 1) {
    substringArr = substringArr.concat(leadingSubstrings(inputString.slice(i)));
  }
  return substringArr;
}

console.log(substrings("abcde"));

console.log();
console.log("Palindromic Substrings");

function palindromes(inputString) {
  return substrings(inputString)
    .filter(
      (elem) => (elem.length > 1 && elem.split("").reverse().join("") === elem),
    );
}

console.log(palindromes("abcd")); // []
console.log(palindromes("madam")); // [ "madam", "ada" ]

console.log(palindromes("hello-madam-did-madam-goodbye"));
// returns
// [ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
//   "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
//   "-madam-", "madam", "ada", "oo" ]

console.log(palindromes("knitting cassettes"));
// returns
// [ "nittin", "itti", "tt", "ss", "settes", "ette", "tt" ]

console.log();
console.log("Sum of Sums");
function sumArray(numberArr) {
  return numberArr.reduce((sum, num) => sum + num, 0);
}

function sumOfSums(numberArr) {
  return numberArr
    .flatMap((_, index, arr) => arr.slice(0, arr.length - index))
    .reduce((sum, val) => sum + val, 0);
}

console.log(sumOfSums([3, 5, 2])); // (3) + (3 + 5) + (3 + 5 + 2) --> 21
console.log(sumOfSums([1, 5, 7, 3])); // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
console.log(sumOfSums([4])); // 4
console.log(sumOfSums([1, 2, 3, 4, 5])); // 35

console.log();
console.log("Grocery List");
const buyFruit = (arr) => arr.flatMap(([item, num]) => Array(num).fill(item));
console.log(buyFruit([["apple", 3], ["orange", 1], ["banana", 2]]));
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

console.log();
console.log("Inventory Item Transactions");
function transactionsFor(itemId, transactionsArr) {
  return transactionsArr
    .filter(transaction => transaction.id === itemId);
}

let transactions = [ { id: 101, movement: 'in',  quantity:  5 },
                     { id: 105, movement: 'in',  quantity: 10 },
                     { id: 102, movement: 'out', quantity: 17 },
                     { id: 101, movement: 'in',  quantity: 12 },
                     { id: 103, movement: 'out', quantity: 20 },
                     { id: 102, movement: 'out', quantity: 15 },
                     { id: 105, movement: 'in',  quantity: 25 },
                     { id: 101, movement: 'out', quantity: 18 },
                     { id: 102, movement: 'in',  quantity: 22 },
                     { id: 103, movement: 'out', quantity: 15 }, ];

console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]

console.log();
console.log("Inventory Item Availability");
function isItemAvailable(itemId, transactionsArr) {
  return (
    transactionsFor(itemId, transactionsArr)
      .reduce((availableQty, transaction) => {
        if (transaction.movement === 'in') {
          return availableQty + transaction.quantity;
        } else if (transaction.movement === 'out') {
          return availableQty - transaction.quantity;
        }
      }, 0)
    > 0
  )
}

console.log(isItemAvailable(101, transactions));     // false
console.log(isItemAvailable(103, transactions));     // false
console.log(isItemAvailable(105, transactions));     // true
