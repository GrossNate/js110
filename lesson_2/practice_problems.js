//  # Problem 1
// let arr = ['10', '11', '9', '7', '8'];
// console.log(arr.sort((a, b) => Number(b) - Number(a)));

//  # Problem 2
// let books = [
//   { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
//   { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
//   { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
//   { title: 'Ulysses', author: 'James Joyce', published: '1922' },
//   { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
// ];
// console.log(books.sort((a, b) => Number(a.published) - Number(b.published)));

//  # Problem 3
// let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
// let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
// let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
// let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
// let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
//
// console.log(arr1[2][1][3]);
// console.log(arr2[1].third[0]);
// console.log(arr3[2].third[0][0]);
// console.log(obj1.b[1]);
// console.log(Object.keys(obj2.third)[0]);

//  # Problem 4
// let arr1 = [1, [2, 3], 4];
// let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
// let obj1 = { first: [1, 2, [3]] };
// let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
//
// arr1[1][1] = 4;
// arr2[2] = 4;
// obj1['first'][2][0] = 4;
// obj2['a']['a'][2] = 4;
//
// console.log(arr1);
// console.log(arr2);
// console.log(obj1);
// console.log(obj2);

//  # Problem 5
// let munsters = {
//   Herman: { age: 32, gender: "male" },
//   Lily: { age: 30, gender: "female" },
//   Grandpa: { age: 402, gender: "male" },
//   Eddie: { age: 10, gender: "male" },
//   Marilyn: { age: 23, gender: "female" },
// };
// console.log(
//   Object.values(munsters).reduce(
//     (totalMaleAge, { age, gender }) =>
//       totalMaleAge += (gender === "male") ? age : 0,
//     0,
//   ),
// );

//  # Problem 6
// Object.entries(munsters).forEach(([name, {age, gender}]) => console.log(`${name} is a ${age} year old ${gender}.`));

//  # Problem 7
//  a is still 2
//  b is [3, 8]

//  # Problem 8
// let obj = {
//   first: ["the", "quick"],
//   second: ["brown", "fox"],
//   third: ["jumped"],
//   fourth: ["over", "the", "lazy", "dog"],
// };
//
// Object.values(obj).forEach((arr) =>
//   arr.join("").split("").forEach((letter) =>
//     !"aeiou".includes(letter) || console.log(letter)
//   )
// );

//  # Problem 9
// let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
//
// console.log(arr.map(arr => {
//   if (arr.every(element => typeof element === 'number')) {
//     return arr.slice().sort((a, b) => a - b);
//   } else {
//     return arr.slice().sort();
//   }
// }));
//
// console.log(arr);

//  # Problem 10
// let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
//
// console.log(arr.map(arr => {
//   if (arr.every(element => typeof element === 'number')) {
//     return arr.slice().sort((a, b) => b - a);
//   } else {
//     return arr.slice().sort((a, b) => (a < b) ? 1 : (a > b) ? -1 : 0);
//   }
// }));
//
// console.log(arr);

//  # Problem 11
// let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];
//
// console.log(arr.map(obj => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value + 1]))));
//
// console.log(arr);

//  # Problem 12
// let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];
// console.log(arr.map(myArr => myArr.filter(number => (number % 3 === 0))));

//  # Problem 13
// let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
// const sumOdds = (arr) =>
//   arr.filter((num) => num % 2 != 0).reduce((sum, num) => sum + num);
//
// console.log(
//   arr.sort((a, b) => sumOdds(a) - sumOdds(b)),
// );

//  # Problem 14
// let obj = {
//   grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
//   carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
//   apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
//   apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
//   marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
// };
//
// let produceArray = Object.values(obj);
// let newArray = [];
// for (let counter = 0; counter < produceArray.length; counter += 1) {
//   if (produceArray[counter].type === 'fruit') {
//     newArray.push(produceArray[counter].colors.map(color => color[0].toUpperCase() + color.slice(1)));
//   } else if (produceArray[counter].type === 'vegetable') {
//     newArray.push(produceArray[counter].size.toLocaleUpperCase());
//   }
// }
//
// console.log(newArray);

//  # Problem 15
// let arr = [
//   { a: [1, 2, 3] },
//   { b: [2, 4, 6], c: [3, 6], d: [4] },
//   { e: [8], f: [6, 10] },
// ];
//
// console.log(
//   arr.filter((obj) => Object.values(obj).flat().every((num) => num % 2 === 0))
// );

//  # Problem 16
// let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
//
// // expected value of object
// // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }
//
// console.log(Object.fromEntries(arr));
//
// let newObj = {};
// for (let counter = 0; counter < arr.length; counter += 1) {
//   newObj[arr[counter][0]] = arr[counter][1];
// }
//
// console.log(newObj);

//  # Problem 17
function generateUUID() {
  let newUUID = "";
  for (let digit = 0; digit <= 32; digit += 1) {
    newUUID += ([8, 12, 16, 20].includes(digit) ? "-" : "") +
      "0123456789abcdef"[Math.floor(Math.random() * 16)];
  }
  return newUUID;
}

console.log(generateUUID());
