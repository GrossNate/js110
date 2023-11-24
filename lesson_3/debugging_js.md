# Word Ladder

The first line hasn't been terminated by a semicolon, so node is confused.

# Reserved Keywords

The `.forEach()` method of an array always runs to completion unless an
exception is thrown. The `return true`; statement on line 11 has no effect -
this function will always return `false`.

To fix it, you just re-write it so that it uses some other loop, for example, a for loop like this:

```javascript
const RESERVED_KEYWORDS = ['break', 'case', 'catch', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally',
  'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface',
  'let', 'new', 'package', 'private', 'protected', 'public', 'return', 'static',
  'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
  'with', 'yield'];

function isReserved(name) {
  for (let word of RESERVED_KEYWORDS) {
    if (name === word) return true;
  }
  return false;
}

console.log(isReserved('monkey')); // false
console.log(isReserved('patch'));  // false
console.log(isReserved('switch')); // should be: true
```

# Random Recipe Generator
You can't concatenate arrays using the `+` operator - it will produce a string
instead.

# Task List
`delete` removes the property of an object, but that means that on an array the
element is removed, but there's an "empty item" at that index. To fix this we
just need to re-write the `.completeTasks()` function to use `.shift()` instead,
like so:
```javascript
function completeTasks(n = 1) {
  let tasksComplete = 0;

  while (todos.length > 0 && tasksComplete < n) {
    console.log(`${todos.shift()} complete!`);
    tasksComplete++;
  }

  if (todos.length === 0) {
    console.log('All tasks complete!');
  } else {
    console.log(`${tasksComplete} tasks completed; ${todos.length} remaining.`);
  }
}
```

