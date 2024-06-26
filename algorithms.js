/*
Big O of Object methods:

Object.keys - O(N)
Object.values - O(N)
Object.entries - O(N)
hasOwnProperty - O(1) (constant time)

*/

/* 
How arrays performed:

when yo use arrays?
- when you need order
- when you need fast access/insertion
*/

// write a function which takes in a string and returns counts of each character in the string

const charCount = (string) => {
  let result = {};

  for (let char of string) {
    if (isAlphanumeric(char)) {
      result[char] = ++result[char] || 1;
    }
  }

  return result;
};

const isAlphanumeric = (char) => {
  let code = char.charCodeAt(0);

  if (
    !(code > 47 && code < 58) &&
    !(code > 64 && code < 91) &&
    !(code > 96 && code < 123)
  ) {
    return false;
  }

  return true;
};

//console.log(charCount('HHHHello world people'))

/* ---------------- FREQUENCY COUNTER PATTERN -----------------*/

// This pattern uses objects or sets to collect values/frequencies of values. This can often avoid the need for nested loops or O(N^2) operations with arrays/strings

// ------------------- Exercises:

// 1. Write a function called same, which accepts two arrays. The function should return true if every value in the array has its corresponding value squared in the second array. The frecuency
// of values must be the same

const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  for (let val in arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }

  for (let val in arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }

    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }

  return true;
};

//console.log(same([1, 2, 3, 2], [9, 1, 4, 4]))

// 2. Anagram

const validAnagram = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < str1.length; i++) {
    const letter = str1[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
    console.log(lookup);
  }

  for (let i = 0; i < str2.length; i++) {
    const letter = str2[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
};

//console.log(validAnagram('qwerty', 'qeywrt'))

/* ---------------- MULTIPLE POINTERS -----------------*/

// creating pointers or values that correspond to an index or a position and move towards the beginning, end or middle base on a certain condition.
// Very efficient for solving problems with minimal space complexity as well

// ------------------- Exercises:

// 1. Write a function which aceppts a sorted array of integers. The function should find the first pair where the sum is 0. Return an arrat that includes both values that sum to zero or undefined
// if a pair does not exist.

//approach one

const sumZero = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
  return undefined;
};

//console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 5]))

// better approach:

const sumZero2 = (arr) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
};

//console.log(sumZero2([-4, -3, -2, -1, 0, 1, 2, 7, 5]))

// 2. implemente a function which accepts a sorted arratm and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted

const countUniqueValues = (arr) => {
  if (arr.length === 0) return 0;
  let unique = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[unique]) {
      unique++;
      arr[unique] = arr[i];
    }
  }

  return unique + 1;
};

//console.log(countUniqueValues([1, 2, 3, 4, 4, 4,7, 7, 12, 12, 13]))

/* ---------------- SLIDING WINDOW -----------------*/

// This pattern involves creating a window which can be either be an array or number from one position to another. Depending on a certain condition the window either increases or closes
// (and a new window is created). Very useful for keeping track of a subset of data in an array/string, etc

// ------------------- Exercises:

// 1. Write a function which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

const maxSubarraySum = (arr, num) => {
  let maxSum = 0;
  let temp = 0;

  if (arr.length < num) return null;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  temp = maxSum;

  for (let i = num; i < arr.length; i++) {
    temp = temp - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, temp);
  }

  return maxSum;
};

//console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3))

/* ---------------- DIVIDE AND CONQUER -----------------*/

// This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
// This pattern can tremendously decrease time complexity

// =========================PRACTICE==================================

// 1. Write a function. Given two positive integers, find out if the two numbers have the same frequency of digits

const sameFrequency = (num1, num2) => {
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if (strNum1.length !== strNum2.length) return false;

  let countNum1 = {};
  let countNum2 = {};

  for (let i = 0; i < strNum1.length; i++) {
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1;
  }

  for (let j = 0; j < strNum1.length; j++) {
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1;
  }

  for (let key in countNum1) {
    if (countNum1[key] !== countNum2[key]) return false;
  }

  return true;
};

//console.log(sameFrequency(182,281))

// 2. Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.
// You can solve this using the frequency counter pattern OR the multiple pointers pattern.

// - using frequency counter pattern

function areThereDuplicates(...args) {
  const frequencyCounter = {};

  for (let val of args) {
    frequencyCounter[val] = (frequencyCounter[val] || 0) + 1;
  }

  for (let key in frequencyCounter) {
    if (frequencyCounter[key] > 1) {
      return true;
    }
  }

  return false;
}

// console.log(areThereDuplicates(1, 2, 3)); // false
// console.log(areThereDuplicates(1, 2, 2)); // true
// console.log(areThereDuplicates("a", "b", "c", "a")); // true

function areThereDuplicates2(...args) {
  args.sort((a, b) => (a > b ? 1 : -1));

  let pointer1 = 0;
  let pointer2 = 1;

  while (pointer2 < args.length) {
    //console.log(args[pointer1], args[pointer2]);
    if (args[pointer1] === args[pointer2]) {
      return true;
    }
    pointer1++;
    pointer2++;
  }

  return false;
}

// Example usage:
// console.log(areThereDuplicates2(1, 2, 3)); // false
// console.log(areThereDuplicates2(1, 2, 2)); // true
// console.log(areThereDuplicates2("a", "b", "c", "a")); // true

const areThereDuplicates3 = (...arguments) => {
  return new Set(arguments).size !== arguments.length;
};

// console.log(areThereDuplicates3(1, 2, 3)); // false
// console.log(areThereDuplicates3(1, 2, 2)); // true
// console.log(areThereDuplicates3("a", "b", "c", "a")); // true

//Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

const averagePair = (arr, average) => {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let avg = (arr[start] + arr[end]) / 2;

    if (avg === average) return true;
    else if (avg < average) start++;
    else end--;
  }

  return false;
};
// console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false

//Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

const isSubsequence = (arr1, arr2) => {
  let i = 0;
  let j = 0;

  if (!arr1) return false;
  while (j < arr2.length) {
    if (arr1[j] === arr1[i]) i++;
    if (i === arr1.length) return true;
    j++;
  }
  return false;
};

//Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer. This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.

const minSubArrayLen = (nums, target) => {
  let minLength = Infinity;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
};

// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // Output: 2
// console.log(minSubArrayLen([2, 1, 6, 5, 4], 9)); // Output: 2
// console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // Output: 1
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39)); // Output: 3
// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95)); // Output: 0
