console.log("Uppercase Check");
function isUppercase(string) {
  return (string === string.toUpperCase());
}

console.log(isUppercase("t")); // false
console.log(isUppercase("T")); // true
console.log(isUppercase("Four Score")); // false
console.log(isUppercase("FOUR SCORE")); // true
console.log(isUppercase("4SCORE!")); // true
console.log(isUppercase("")); // true

console.log("");
console.log("Delete Vowels");
const vowels = ["a", "e", "i", "o", "u"];

function isVowel(char) {
  return vowels.includes(char.toLowerCase());
}

function removeVowels(stringsArr) {
  return stringsArr
    .map((string) =>
      string.split("").filter((char) => !isVowel(char)).join("")
    );
}

console.log(removeVowels(["abcdefghijklmnopqrstuvwxyz"])); // ["bcdfghjklmnpqrstvwxyz"]
console.log(removeVowels(["green", "YELLOW", "black", "white"])); // ["grn", "YLLW", "blck", "wht"]
console.log(removeVowels(["ABC", "AEIOU", "XYZ"])); // ["BC", "", "XYZ"]

console.log();
console.log("Lettercase Counter");
function letterCaseCount(string) {
  const neitherCount = (string) => {
    let chars = string.match(/[^a-z]/gi);
    return (chars === null ? 0 : chars.length);
  };
  const uppercaseCount = (string) => {
    let chars = string.match(/[A-Z]/g);
    return (chars === null ? 0 : chars.length);
  };
  const lowercaseCount = (string) => {
    let chars = string.match(/[a-z]/g);
    return (chars === null ? 0 : chars.length);
  };
  return {
    lowercase: lowercaseCount(string),
    uppercase: uppercaseCount(string),
    neither: neitherCount(string),
  };
}

console.log(letterCaseCount("abCdef 123")); // { lowercase: 5, uppercase: 1, neither: 4 }
console.log(letterCaseCount("AbCd +Ef")); // { lowercase: 3, uppercase: 3, neither: 2 }
console.log(letterCaseCount("123")); // { lowercase: 0, uppercase: 0, neither: 3 }
console.log(letterCaseCount("")); // { lowercase: 0, uppercase: 0, neither: 0 }

console.log();
console.log("Capitalize Words");
function upperCaseChar(match) {
  return match.toUpperCase();
}
function wordCap(string) {
  return string.replace(/(?<=^|\s)([^\s])/g, upperCaseChar);
}

console.log(wordCap("four score and seven")); // "Four Score And Seven"
console.log(wordCap("the javaScript language")); // "The Javascript Language"
console.log(wordCap('this is a "quoted" word')); // 'This Is A "quoted" Word'

console.log();
console.log("Swap Case");
function toReverseCaseChar(match) {
  return (match === match.toUpperCase()
    ? match.toLowerCase()
    : match.toUpperCase());
}
function swapCase(string) {
  return string.replace(/[a-z]/gi, toReverseCaseChar);
}

console.log(swapCase("CamelCase")); // "cAMELcASE"
console.log(swapCase("Tonight on XYZ-TV")); // "tONIGHT ON xyz-tv"

console.log();
console.log("Staggered Caps (Part 1)");

function staggeredCase(string) {
  return string
    .split("")
    .map((letter, index) => {
      if (index % 2 === 0) {
        return letter.toUpperCase();
      } else {
        return letter.toLowerCase();
      }
    })
    .join("");
}

console.log(staggeredCase("I Love Launch School!")); // "I LoVe lAuNcH ScHoOl!"
console.log(staggeredCase("ALL_CAPS")); // "AlL_CaPs"
console.log(staggeredCase("ignore 77 the 4444 numbers")); // "IgNoRe 77 ThE 4444 nUmBeRs"

console.log();
console.log("Staggered Caps (Part 2)");
function staggeredCase2(string) {
  let letterIndex = -1;
  return string
    .split("")
    .map((char) => {
      if (char.match(/[^a-z]/i)) return char;
      letterIndex += 1;
      if (letterIndex % 2 === 0) {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    })
    .join("");
}

console.log(
  staggeredCase2("I Love Launch School!") === "I lOvE lAuNcH sChOoL!",
);
console.log(staggeredCase2("ALL CAPS") === "AlL cApS");
console.log(
  staggeredCase2("ignore 77 the 444 numbers") === "IgNoRe 77 ThE 444 nUmBeRs",
);

console.log();
console.log("How long are you?");
function wordLengths(string) {
  if (string === undefined || string === "") return [];
  return string
    .split(" ")
    .map((word) => `${word} ${word.length}`);
}

console.log(wordLengths("cow sheep chicken"));
// ["cow 3", "sheep 5", "chicken 7"]

console.log(wordLengths("baseball hot dogs and apple pie"));
// ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]

console.log(wordLengths("It ain't easy, is it?"));
// ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]

console.log(wordLengths("Supercalifragilisticexpialidocious"));
// ["Supercalifragilisticexpialidocious 34"]

console.log(wordLengths("")); // []
console.log(wordLengths()); // []

console.log();
console.log("Search Word (Part 1)");
function searchWord(word, text) {
  if (arguments.length < 2) return null;
  let searchResults = text.match(RegExp(`\\b${word}\\b`, "gi"));
  if (searchResults === null) return 0;
  return searchResults.length;
}

const text =
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

console.log(searchWord("sed", text)); // 3
console.log(searchWord("qui", text)); // 4
console.log(searchWord("blargh", text)); // 0
console.log(searchWord()); // null

console.log();
console.log("Search Word (Part 2)");
function searchWord2(word, text) {
  if (arguments.length < 2) return null;
  return text.replace(
    RegExp(`\\b${word}\\b`, "gi"),
    `***${word.toUpperCase()}***`,
  );
}

console.log(searchWord2("sed", text));
