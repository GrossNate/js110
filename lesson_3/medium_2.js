console.log("Lettercase Percentage Ratio");
function letterPercentages(string) {
  let lowerMatches = string.match(/[a-z]/g);
  let upperMatches = string.match(/[A-Z]/g);
  let neitherMatches = string.match(/[^a-zA-Z]/g);
  return {
    lowercase: ((lowerMatches ? lowerMatches.length : 0) / string.length * 100)
      .toFixed(2),
    uppercase: ((upperMatches ? upperMatches.length : 0) / string.length * 100)
      .toFixed(2),
    neither:
      ((neitherMatches ? neitherMatches.length : 0) / string.length * 100)
        .toFixed(2),
  };
}

console.log(letterPercentages("abCdef 123"));
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

console.log(letterPercentages("AbCd +Ef"));
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

console.log(letterPercentages("123"));
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }

console.log();
console.log("Triangle Sides");
function triangle(side1, side2, side3) {
  if (arguments.length !== 3) return "invalid";
  let sides = [side1, side2, side3].sort((a, b) => a - b);
  if (sides.includes(0)) return "invalid";
  if ((sides[0] === sides[1]) && (sides[1] === sides[2])) {
    return "equilateral";
  } else if (sides[1] === sides[2]) {
    return "isosceles";
  } else if (sides[0] + sides[1] < sides[2]) {
    return "invalid";
  } else {
    return "scalene";
  }
}

console.log(triangle(3, 3, 3)); // "equilateral"
console.log(triangle(3, 3, 1.5)); // "isosceles"
console.log(triangle(3, 4, 5)); // "scalene"
console.log(triangle(0, 3, 3)); // "invalid"
console.log(triangle(3, 1, 1)); // "invalid"

console.log();
console.log("Tri-Angles");
function triangle2(angle1, angle2, angle3) {
  if (arguments.length !== 3) return "invalid arguments";
  let angles = [angle1, angle2, angle3];
  if ((angle1 + angle2 + angle3 !== 180) || (angles.includes(0))) {
    return "invalid";
  }
  if (angles.includes(90)) {
    return "right";
  }
  if (angles.reduce((isAcute, angle) => (isAcute && angle < 90), true)) {
    return "acute";
  }
  if (angles.reduce((isObtuse, angle) => (isObtuse || angle > 90), false)) {
    return "obtuse";
  }
  return "something went wrong"; // Should not reach this point in practice.
}

console.log(triangle2(60, 70, 50)); // "acute"
console.log(triangle2(30, 90, 60)); // "right"
console.log(triangle2(120, 50, 10)); // "obtuse"
console.log(triangle2(0, 90, 90)); // "invalid"
console.log(triangle2(50, 50, 50)); // "invalid"

console.log();
console.log("Unlucky Days");
/*
 * Problem:
 *  How many Friday the 13ths there are in a given year.
 *  Assume the year is > 1752.
 *  According to the internet, 1 Jan 1752 was a Saturday.
 * Examples/Test Cases:
 *  * Leap years
 *  * 1986 -> 1
 *  * 2015 -> 3
 *  * 2017 -> 2
 * Data Structures
 *  * Array with the lengths of each month
 *  * When using week arrays, we'll start with 0 being a Saturday since that
 *    works with our reference day.
 * Algorithm
 *  * Determine whether it's a leap year
 *    * If year divided by 400 has no remainder then it's a leap year
 *    * If year divided by 100 has no remainder then it's not a leap year
 *    * If year divided by 4 has no remainder then it's a leap year
 *  * Determine the first day of the year
 *    * Determine the number of days between our reference day (1 Jan 1752) and
 *      the start of the year in question
 *    * That number remainder function 7 should give us the offset from the
 *      weekday of the reference day.
 *  * Iterate through the year, incrementing a counter for each Friday the 13th.
 *    * Initialize startWeekdayIndex to whatever weekdayIndex is the first day
 *      of the year.
 *    * Iterate through the months
 *      * Iterate through the days in the month
 *        * Increment the weekdayIndex
 *        * If the day of the month is 13, check the weekdayIndex % 7 and
 *          increment the FridayThe13thsCounter if it's === FRIDAY_INDEX
 */
// const WEEKDAYS = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
const UNLUCKY_DAY_INDEX = 6; // WEEKDAYS[6] === 'fri'
const UNLUCKY_DATE = 13;
const REFERENCE_YEAR = 1752;
const REFERENCE_WEEKDAY_INDEX = 0; // 1 Jan 1752 was a Saturday.
const MONTH_DAYS = {
  nonLeap: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
};

function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

function getJanFirstWeekday(year) {
  let daysOffset = 0;
  for (let yearCount = REFERENCE_YEAR; yearCount < year; yearCount += 1) {
    if (isLeapYear(yearCount)) {
      daysOffset += 366;
    } else {
      daysOffset += 365;
    }
  }
  return (REFERENCE_WEEKDAY_INDEX + daysOffset) % 7;
}

function fridayThe13ths(year) {
  let fridayThe13thsCounter = 0;
  let dayIndex = getJanFirstWeekday(year); // Starting on correct day of week.
  let monthDaysArray = (isLeapYear(year))
    ? MONTH_DAYS.leap
    : MONTH_DAYS.nonLeap;
  for (
    let monthIndex = 0;
    monthIndex < monthDaysArray.length;
    monthIndex += 1
  ) {
    for (let day = 1; day <= monthDaysArray[monthIndex]; day += 1) {
      if ((day === UNLUCKY_DATE) && (dayIndex % 7 === UNLUCKY_DAY_INDEX)) {
        fridayThe13thsCounter += 1;
      }
      dayIndex += 1;
    }
  }
  return fridayThe13thsCounter;
}
console.log(fridayThe13ths(1986)); // 1
console.log(fridayThe13ths(2015)); // 3
console.log(fridayThe13ths(2017)); // 2

console.log();
console.log("Next Featured Number Higher than a Given Value");
function isFeaturedNumber(number) {
  if (number > 9876543201) return false;
  if (number % 2 !== 1) return false;
  if (number % 7 !== 0) return false;
  let digitCheckArray = Array(10).fill(0);
  number.toString().split("").forEach((digit) => digitCheckArray[digit] += 1);
  if (digitCheckArray.every((count) => count <= 1)) return true;
  return false;
}

function featured(number) {
  if (number >= 9876543201) {
    return "There is no possible number that fulfills those requirements";
  }
  do {
    number += 1;
  } while (!isFeaturedNumber(number));
  return number;
}

console.log(featured(12)); // 21
console.log(featured(20)); // 21
console.log(featured(21)); // 35
console.log(featured(997)); // 1029
console.log(featured(1029)); // 1043
console.log(featured(999999)); // 1023547
console.log(featured(999999987)); // 1023456987
console.log(featured(9876543186)); // 9876543201
console.log(featured(9876543200)); // 9876543201
console.log(featured(9876543201)); // "There is no possible number that fulfills those requirements."

console.log();
console.log("Sum Square - Square Sum");
function sumSquareDifference(count) {
  let integers = Array(count).fill("").map((_, index) => index + 1);
  return (integers.reduce((sum, integer) => sum + integer, 0) ** 2) -
    integers.reduce((sum, integer) => sum + (integer ** 2), 0);
}

console.log(sumSquareDifference(3)); // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
console.log(sumSquareDifference(10)); // 2640
console.log(sumSquareDifference(1)); // 0
console.log(sumSquareDifference(100)); // 25164150

console.log();
console.log("Bubble Sort");
function bubbleSort(array) {
  let swaps;
  do {
    swaps = false;
    for (let i = 0; i < array.length - 1; i += 1) {
      if (array[i] > array[i + 1]) {
        swaps = true;
        let tempVal = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tempVal;
      }
    }
  } while (swaps);
}

let array1 = [5, 3];
bubbleSort(array1);
console.log(array1); // [3, 5]

let array2 = [6, 2, 7, 1, 4];
bubbleSort(array2);
console.log(array2); // [1, 2, 4, 6, 7]

let array3 = ["Sue", "Pete", "Alice", "Tyler", "Rachel", "Kim", "Bonnie"];
bubbleSort(array3);
console.log(array3); // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

console.log();
console.log("Longest Sentence");
function longestSentence(text) {
  let sentences = text.match(/\b[^.?!]+[.?!]/g);
  let wordCounts = sentences.map((sentence) => sentence.split(/\s/).length);
  let wordCountOfLongestSentence = Math.max(...wordCounts);
  let indexOfLongestSentence = wordCounts.indexOf(wordCountOfLongestSentence);

  console.log(sentences[indexOfLongestSentence]);
  console.log();
  console.log(`The longest sentence has ${wordCountOfLongestSentence} words.`);
}

let longText =
  "Four score and seven years ago our fathers brought forth on this " +
  "continent a new nation, conceived in liberty, and dedicated to the " +
  "proposition that all men are created equal. Now we are engaged in a " +
  "great civil war, testing whether that nation, or any nation so " +
  "conceived and so dedicated, can long endure. We are met on a great " +
  "battlefield of that war. We have come to dedicate a portion of that " +
  "field, as a final resting place for those who here gave their lives " +
  "that that nation might live. It is altogether fitting and proper that " +
  "we should do this.";

let longerText = longText +
  "But, in a larger sense, we can not dedicate, we can not consecrate, " +
  "we can not hallow this ground. The brave men, living and dead, who " +
  "struggled here, have consecrated it, far above our poor power to add " +
  "or detract. The world will little note, nor long remember what we say " +
  "here but it can never forget what they did here. It is for us the " +
  "living, rather, to be dedicated here to the unfinished work which " +
  "they who fought here have thus far so nobly advanced. It is rather " +
  "for us to be here dedicated to the great task remaining before us -- " +
  "that from these honored dead we take increased devotion to that " +
  "cause for which they gave the last full measure of devotion -- that " +
  "we here highly resolve that these dead shall not have died in vain " +
  "-- that this nation, under God, shall have a new birth of freedom -- " +
  "and that government of the people, by the people, for the people, " +
  "shall not perish from the earth.";

longestSentence(longText);
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
//
// The longest sentence has 30 words.

longestSentence(longerText);
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.
//
// The longest sentence has 86 words.

longestSentence("Where do you think you're going? What's up, Doc?");
// Where do you think you're going?
//
// The longest sentence has 6 words.

longestSentence("To be or not to be! Is that the question?");
// To be or not to be!
//
// The longest sentence has 6 words.
