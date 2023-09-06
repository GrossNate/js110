const swap = (string) =>
  string
    .split(" ")
    .map(
      (word) => (
        word.length === 1
          ? word
          : word.slice(-1) + word.slice(1, -1) + word.slice(0, 1)
      ),
    )
    .join(" ");

console.log(swap("Oh what a wonderful day it is")); // "hO thaw a londerfuw yad ti si"
console.log(swap("Abcde")); // "ebcdA"
console.log(swap("a")); // "a"
