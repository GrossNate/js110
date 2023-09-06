# Practice Problem 1

`[1, 2, 3]` because 'hi' is truthy, so the filter method includes every element

# Practice Problem 2

`[undefined, undefined, undefined]` because the callback function uses a curly
brace block but provides no return value, so its return is `undefined`

# Practice Problem 3

`[1, 4, 9]` because this callback does return the square of the argument.

# Practice Problem 4

`11` because the `pop()` method returns the last element in the array, and that
happens to be the string 'caterpillar', which is 11 characters long.

# Practice Problem 5

`2`, `4`, `6`, and `true` because the `every()` method checks to see if the
callback function evaluates to a truthy value on every element of the array. The
expression that's evaluated as part of the return statement is actually an
assignment, but the assignment evaluates to `num * 2`

# Practice Problem 6

It changes elements to whatever the first argument is. It starts at the index
given by the second argument and continues until the end of the array or
**before** the index given by the third argument. It is destructive. The best
way to find out would be to look up the documentation in MDN. However we could
also put together a whole bunch of tests to figure it out.

# Practice Problem 7

`[undefined, 'bear']` because the callback passed to the `map()` function
returns the element passed to it if the element length is greater than 3.
Otherwise, it doesn't specify a return value so `undefined` will be returned.

# Practice Problem 8

```javascript
function convertToObject(stringArray) {
  let returnObject = {};
  stringArray.forEach((element, index) => (returnObject[element] = index));
  return returnObject;
}
```

# Practice Problem 9

```javascript
Object.values(ages).reduce((total, age) => (total += age));
```

# Practice Problem 10

```javascript
Object.values(ages).sort()[0];
```

or, alternatively if we want to use "spread syntax"

```javascript
Math.min(...Object.values(ages));
```

# Practice Problem 11

```javascript
let letterFrequency = {};
statement
  .replaceAll(" ", "")
  .split("")
  .forEach((letter) => {
    if (letterFrequency.hasOwnProperty(letter)) {
      letterFrequency[letter] += 1;
    } else {
      letterFrequency[letter] = 1;
    }
  });
```

Note that the if statement could have been obviated by using short-circuiting, like so:

```javascript
letterFrequency[letter] = letterFrequency[letter] || 0;
letterFrequency[letter] += 1;
```
