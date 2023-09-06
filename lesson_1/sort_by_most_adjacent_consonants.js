// # Problem
// * Input: array of strings
// * Output: array of strings sorted by number of adjacent consonants
// ## Explicit
// * if two strings contain the same highest number of adjacent consonants they should retain their original order. ("sort stability")
// * spaces don't matter - consonants on either side of a space still count
// ## Implicit
// * strings aren't just single words
// ## Questions
// * What about other non-letter characters (like dashes, apostrophes, etc.)
// * What counts as a consonant? (i.e. can we assume English language?)
// * Is "y" a consonant?
// # Examples/Test Cases
// * a single consonant doesn't count as an adjacent consonant
// * should be sorted descending
// # Data structures
// * Arrays or possibly arrays of objects
// # Algorithm
// * Determine the consonant cluster length of each word
// * Sort the words by that consonant cluster length
// * Return the sorted array
// * function for determining max consonant cluster length
//    * Input: string
//    * Output: an integer representing the highest number of adjacent consonants
//    * Algorithm: two local variables - one to hold a count, the other a max count.
//      Iterate through the string, incrementing the count whenever the next character is a consonant
//      Check each time to iterate to see if the cluster is greater than the max count and, if so, increment it.
//      Remember to strip out spaces. Also remember 1 consonant doesn't count as a cluster
// # Code
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz'.split("");

function isConsonant(char) {
  return CONSONANTS.includes(char);
}

function countMaxAdjacentConsonants(word) {
  let maxLength = 0;
  let currentLength = 0;
  word = word.replaceAll(" ", "");
  for (let char = 0; char < word.length; char += 1) {
    if (isConsonant(word[char])) {
      currentLength += 1;
    } else {
      if ((currentLength > 1) && (currentLength > maxLength)) {
        maxLength = currentLength;
        currentLength = 0;
      }
    }
  }
  if ((currentLength > 1) && (currentLength > maxLength)) {
    maxLength = currentLength;
    currentLength = 0;
  }
  return maxLength;
}

function sortStringsByConsonants(stringArray) {
  let sortedArray = stringArray.slice(0);
  sortedArray.sort((a, b) => countMaxAdjacentConsonants(a) > countMaxAdjacentConsonants(b) ? -1 : (countMaxAdjacentConsonants(a) < countMaxAdjacentConsonants(b) ? 1 : 0));
  return sortedArray;
}

console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']
