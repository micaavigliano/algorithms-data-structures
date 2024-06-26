// Recursion
// recursion es un proceso que se llama a si mismo.
// en javascript hay varias funciones que son recursiones
// - JSON.parse / JSON.stringify
// - document.getElementById and DOM traversal algorithms
// - Object traversal

// Call Stack
// it is a stack data structure
// any time a function is invoked it is placed on the top of the call stack
// when Javascript sees the return keyword or when the function ends, the compiler will remove(pop)

// The base case is where the recursion function stops. This is the most important
// step

// countdown with recursion

const countDown = (num) => {
  if (num <= 0) {
    console.log("All done!");
    return;
  }
  console.log(num);
  num--;
  countDown(num);
};

//console.log(countDown(5));

// sumRange

const sumRange = (num) => {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
};

//console.log(sumRange(20));

//Factorial

const factorial = (num) => {
  if (num === 1) return 1;
  return num * factorial(num - 1);
};

//console.log(factorial(5));

// design pattern for recursion: HELPER METHOD RECURSION
// tenemos dos funciones outer function y dentro la helper function
const collectOddValues = (arr) => {
  let result = [];

  const helper = (helperInput) => {
    if (helperInput.length === 0) {
      return;
    }

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  };

  helper(arr);
  return result;
};

// console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// PURE RECURSIONN!!!! ------>
const newCollectOddValues = (arr) => {
  let newArr = [];

  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(newCollectOddValues(arr.slice(1)));

  return newArr;
};

//console.log(newCollectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// -------- TIPS ---------
// - for arrays, use methods like slice, the spread operator, and concat that
// make copies of arrays so you do not mutate them
// - strings are immutable so you will need to use methods like slice, substr,
// or substring to make copies of strings
// - to make copies of objects use Object.assign or the spread operator

// exercises

// 1. Write a function called power which accepts a base and an exponent. The function should return the power of the base to the exponent. This function should mimic the functionality of Math.pow()  - do not worry about negative bases and exponents.

const power = (base, exponent) => {
  if (exponent === 0) return 1;

  return base * power(base, exponent - 1);
};

// console.log(power(2, 3)); // Output: 8
// console.log(power(5, 2)); // Output: 25
// console.log(power(3, 4)); // Output: 81

// 2. Write a function factorial which accepts a number and returns the factorial of that number. A factorial is the product of an integer and all the integers below it; e.g., factorial four ( 4! ) is equal to 24, because 4 * 3 * 2 * 1 equals 24.  factorial zero (0!) is always 1.

const factorial2 = (num) => {
  if (num < 0) return 0;
  if (num <= 1) return 1;

  return num * factorial2(num - 1);
};

//console.log(factorial2(7));

// 3. Write a function called productOfArray which takes in an array of numbers and returns the product of them all.

const productOfArray = (arr) => {
  if (arr.length === 0) return 1;

  return arr[0] * productOfArray(arr.slice(1));
};

//console.log(productOfArray([1, 2, 3, 10]));

//4. Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci sequence. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.

const fib = (n) => {
  // Base cases: when n is 1 or 2, return 1
  if (n <= 2) return 1;

  // Recursive case: return the sum of the previous two Fibonacci numbers
  return fib(n - 1) + fib(n - 2);
};

// console.log(fib(1)); // Output: 1
// console.log(fib(2)); // Output: 1
// console.log(fib(3)); // Output: 2
// console.log(fib(4)); // Output: 3
// console.log(fib(5)); // Output: 5
// console.log(fib(6)); // Output: 8

function reverse(str) {
  // Base case: when the string is empty or has only one character, return the string
  if (str.length <= 1) return str;

  // Recursive case: return the last character followed by reverse(rest of the string)
  return str.slice(-1) + reverse(str.slice(0, -1));
}

// Example usage:
// console.log(reverse("hello")); // Output: "olleh"
// console.log(reverse("world")); // Output: "dlrow"
// console.log(reverse("")); // Output: ""
// console.log(reverse("a")); // Output: "a"

// 5. isPalindrome: write a recursive function which returns trye if the string passed to it is a palindrome. Otherwise, is returns false.

const isPalindrome = (str) => {
  if (str.length === 1) return true;
  if (str.length === 2) return str[0] === str[1];
  if (str[0] === str.slice(-1)) return isPalindrome(str.slice(1, -1));
  return false;
};

//console.log(isPalindrome("awesome")); // false
// isPalindrome('foobar') // false
//console.log(isPalindrome("tacocat")); // true
// isPalindrome('amanaplanacanalpanama') // true
// isPalindrome('amanaplanacanalpandemonium') // false

// 6. someRecursive: write a function which accepts an array and a callback. the function returns true if a single value in the array returns true when passed to the callback. Otherwise it returns false

const someRecursive = (array, callback) => {
  if (array.length === 0) return false;
  if (callback(array[0])) return true;
  return someRecursive(array.slice(1), callback);
};

//const isOdd = (val) => val % 2 !== 0;

//console.log(someRecursive([1, 2, 3, 4], isOdd)); // true
// someRecursive([4,6,8,9], isOdd) // true
//console.log(someRecursive([4, 6, 8], isOdd)); // false
// someRecursive([4,6,8], val => val > 10); // false

// 7. isFlatten write a recursive function which accepts an array of arrays with all values flattened

const flatten = (array) => {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      newArr = newArr.concat(flatten(array[i]));
    } else {
      newArr.push(array[i]);
    }
  }

  return newArr;
};

//console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
// console.log(flatten([1, [2, [3, 4], [[5]]]])) // [1, 2, 3, 4, 5]
// console.log(flatten([[1],[2],[3]])) // [1,2,3]
//console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1,2,3

// 8. capitalizeFirst: write a recursion function. Given an arrat of strings, capitalize the first letter of each string in the array

const capitalizeFirst = (array) => {
  if (array.length === 0) {
    return [];
  }

  const capitalizedString = array[0][0].toUpperCase() + array[0].slice(1);
  return [capitalizedString].concat(capitalizeFirst(array.slice(1)));
};

//console.log(capitalizeFirst(["car", "taco", "banana"]));

// 9. nestedEvenSum: Return the sum of all even numbers in an object which may contain nested objects.

const nestedEvenSum = (obj) => {
  let sum = 0;

  function helper(innerObj) {
    for (let key in innerObj) {
      if (typeof innerObj[key] === "object") {
        helper(innerObj[key]);
      } else if (typeof innerObj[key] === "number" && innerObj[key] % 2 === 0) {
        sum += innerObj[key];
      }
    }
  }

  helper(obj);
  return sum;
};

// 10. Given an array of words, return a new array containing each word capitalized.

const capitalizeWords = (array) => {
  if (array.length === 1) {
    return [array[0].toUpperCase()];
  }
  let res = capitalizeWords(array.slice(0, -1));
  res.push(array.slice(array.length - 1)[0].toUpperCase());
  return res;
};
