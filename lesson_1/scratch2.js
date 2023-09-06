let produce = {
  apple: "Fruit",
  carrot: "Vegetable",
  pear: "Fruit",
  broccoli: "Vegetable",
};

let produceKeyValues = Object.entries(produce);

produceKeyValues.forEach(([key, value]) => {
  console.log(`${key} is a ${value}`);
});
// logs:
// apple is a Fruit
// carrot is a Vegetable
// pear is a Fruit
// broccoli is a Vegetable

let str = "What's up, Doc?";

console.log(
  str.split("").reduce((accum, letter) =>
    accum + ("aeiou".includes(letter.toLowerCase()) ? letter : ""), ""),
);

let arr = [1, 2, 3, 4, 5]
arr.fill(1, 2, 3);
console.log(arr);
