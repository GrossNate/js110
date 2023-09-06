function wordSizes(string) {
  string = string.replaceAll(/[^a-zA-Z ]/g, '');
  let returnObject = {};
  if (string ==='') return returnObject;
  string.split(' ').forEach(element => returnObject[element.length] = returnObject[element.length] + 1 || 1);
  return returnObject;
}

console.log(wordSizes('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 1, "7": 2 }
console.log(wordSizes("What's up doc?"));                              // { "2": 1, "4": 1, "6": 1 }
console.log(wordSizes(''));                                            // {}
