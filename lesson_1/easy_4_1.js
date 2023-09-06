const readline = require("readline-sync");

function ordinalize(number) {
  let suffix;
  switch (number.toString().slice(-1)) {
    case "1":
      suffix = "st";
      break;
    case "2":
      suffix = "nd";
      break;
    case "3":
      suffix = "rd";
      break;
    default:
      suffix = "th";
      break;
  }
  return number + suffix;
}

let numbers = [];
for (let i = 1; i <= 6; i += 1) {
  numbers.push(
    readline.questionInt(
      `Enter the ${i === 6 ? "last" : ordinalize(i)} number: `,
    ),
  );
}
let testNumber = numbers.pop();
console.log(
  `The number ${testNumber} ${
    (numbers.includes(testNumber)) ? "appears" : "does not appear"
  } in ${numbers}.`,
);
