function selectFruit(produceObject) {
  let returnFruit = {};
  for (let produce in produceObject) {
    if (produceObject[produce] === 'Fruit') {
      returnFruit[produce] = produceObject[produce];
    }
  }
  return returnFruit;
}

let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }
