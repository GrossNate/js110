console.log("1000 Lights");
/*
 * Problem:
 *  * Take count paramter, return array of all lights that are on after count
 *    passes.
 *  * Starts with all lights off.
 *  * Each pass, toggle the light every X lights - e.g. 1st pass toggle every
 *    light, 2nd pass toggle the 2nd, 4th, 6th etc. lights
 * Examples/Test Cases:
 *  * Count = 1, return [1].
 *  * count = 2, return [1].
 *  * count = 3, return [1].
 *  * count = 4, return [1, 4].
 *  * count = 100, return [1, 4, 9, 16, 25, 36, 49, 64, 81, 100].
 *  * 48 -> 2, 24, 3, 16, 4, 12, 6, 8
 */

class Light {
  constructor(number, state = "off") {
    this.number = number;
    this.state = state;
  }
  toggle() {
    this.state = (this.state === "off") ? "on" : "off";
  }
}

function lightsOn(switches) {
  let lightsArr = Array(switches)
    .fill(null)
    .map((_, index) => new Light(index + 1));
  for (let round = 1; round <= switches; round += 1) {
    lightsArr.forEach((light) => {
      if (light.number % round === 0) light.toggle();
    });
  }
  return lightsArr.reduce(
    (onLights, light) =>
      (light.state === "on") ? onLights.concat(light.number) : onLights,
    [],
  );
}

console.log(lightsOn(100));

console.log();
console.log("Diamonds");

/*
 * Problem:
 *  Input:
 *    - an odd integer (n)
 *  Output:
 *    -display a diamond composed of asterisk characters (*) in an n x n grid
 *    -no return value for the function
 *  Rules:
 *    - can assume an odd integer will be passed
 * Examples/Test Cases:
 *  - Provided in exercise
 * Data Structures:
 *  - I think nothing really - this seems all about the algorithm.
 * Algorithm:
 *  1: 00100
 *  2; 01110
 *  3: 11111
 *  4: 01110
 *  5: 00100
 *  Row 1 - row ceiling(n/2)
 *    1s: row * 2-1
 *    0s: n - (row * 2 - 1)
 *    0s on each side: 0s/2
 *  Row ceiling(n/2) + 1
 *    1s: (n-row)*2 + 1
 *    0s: (n-number of 1s / 2)
 *  Loop through from 1 to n and in the first section use the first Algorithm
 *  to calculate the number of 1s, in the second section use the second.
 */
function diamond(
  n,
  makeHollow = false,
  positiveChar = "*",
  negativeChar = " ",
) {
  for (let row = 1; row <= n; row += 1) {
    let rowWidth = (row <= Math.ceil(n / 2)) ? row * 2 - 1 : (n - row) * 2 + 1;
    let numberOfSpacesEachSide = (n - rowWidth) / 2;
    let hollowSpace = Math.max(0, rowWidth - 2);
    console.log(
      negativeChar.repeat(numberOfSpacesEachSide) + positiveChar +
        (makeHollow ? negativeChar : positiveChar).repeat(hollowSpace) +
        ((row !== 1 && row !== n) ? positiveChar : "") +
        negativeChar.repeat(numberOfSpacesEachSide),
    );
  }
}

diamond(1);
diamond(3);
diamond(9);
diamond(9, true, " ", "X");
diamond(9, false, " ", "O");

console.log();
console.log("Now I Know My ABCs");
/*
 * Problem:
 *  Input:
 *    A string (expecting a single word, but problem doesn't guarantee it)
 *  Output:
 *    Boolean
 *  Rules:
 *    Whether or not string can be composed of the "blocks" provided, using each
 *    "block" only once.
 * Examples/Test Cases:
 *  isBlockWord('BATCH');      // true
 *  isBlockWord('BUTCH');      // false
 *  isBlockWord('jest');       // true
 *  isBlockWord('bxdcngrfjhvlz'); // true
 *  isBlockWord('BA TCH') // false
 * Data Structures
 *  An array of objects
 *  The objects will have a letters property that's an array and a used property
 *  that's a boolean.
 * Algorithm
 *  Loop through the string, checking each letter against the array of "blocks"
 *  to see if it's been used. If not then set that block used to true and
 *  continue to the next letter. If the block has already been used then return
 *  false.
 *  Return true at the end (since that means we got through the whole input word
 *  without re-using blocks).
 */
function selectBlockObject(letterBlocks, letter) {
  return letterBlocks.filter((block) => block.letters.includes(letter))[0];
}

function isBlockWord(word) {
  const letterBlocksInput = "B:O   X:K   D:Q   C:P   N:A " +
    "G:T   R:E   F:S   J:W   H:U " +
    "V:I   L:Y   Z:M";
  let letterBlocks = [];
  letterBlocksInput.split(/\s+/).forEach((letterPair) =>
    letterBlocks.push(
      { letters: letterPair.split(":"), used: false },
    )
  );
  if (word.match(/[^a-z]/gi)) return false;
  for (let charIndex = 0; charIndex < word.length; charIndex += 1) {
    let letter = word[charIndex].toUpperCase();
    if (selectBlockObject(letterBlocks, letter).used) return false;
    selectBlockObject(letterBlocks, letter).used = true;
  }
  return true;
}
console.log(isBlockWord("BATCH")); // true
console.log(isBlockWord("BUTCH")); // false
console.log(isBlockWord("jest")); // true

console.log();
console.log("Seeing Stars");

function star(n, posChar = "*", negChar = " ") {
  let interArmSpace = n - 3;
  let topHalfStarRows = [];
  // Build an array of rows for the top half.
  for (let i = 0; i < Math.floor(n / 2); i += 1) {
    topHalfStarRows.push(
      negChar.repeat(i) 
        + posChar 
        + negChar.repeat(interArmSpace / 2 - i) 
        + posChar 
        + negChar.repeat(interArmSpace / 2 - i) 
        + posChar 
        + negChar.repeat(i),
    );
  }
  // Display the top half.
  for (let i = 0; i < Math.floor(n / 2); i += 1) {
    console.log(topHalfStarRows[i]);
  }
  // Display the center line.
  console.log(posChar.repeat(n));
  // Display the bottom half by simply reversing the top half.
  for (let i = topHalfStarRows.length - 1; i >= 0; i -= 1) {
    console.log(topHalfStarRows[i]);
  }
}

star(31);
star(11, " ", "O");
// 1  4  7
//  2 4 6
//   345
// 1234567
//   345
//  2 4 6
// 1  4  7
