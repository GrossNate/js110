const isPalindrome = (input) => input === input.split("").reverse().join("");

const isRealPalindrome = (input) =>
  isPalindrome(input.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase());
