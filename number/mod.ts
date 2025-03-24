/**
 * A great set of utilities for interacting with numbers. Serving 19 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * _Note: Avoid using it as `const { fn } = NumberUtils`, it can cause issues._
 *
 * @example
 * ```ts
 * import { NumberUtils } from "@zakahacecosas/number-utils";
 *
 * const grades = [5, 7, 4, 9, 5, 6.1];
 * const averageGrade = NumberUtils.average(grades); // get the avg
 * return `You scored an average of ${averageGrade}`;
 * ```
 *
 * @example
 * ```ts
 * function analyzeWages(wages: number[]) {
 *   const avgWage = NumberUtils.roundTo(NumberUtils.average(avgWage), 2);
 *   const highestWage = NumberUtils.max(avgWage);
 *   const lowestWage = NumberUtils.min(avgWage);
 *
 * console.log(`Average wage: ${avgWage}€`);
 * console.log(`Highest wage: ${highestWage}€`);
 * console.log(`Lowest wage: ${lowestWage}€`);
 * }
 *
 * const wages = [1800, 2200, 2500, 1900, 2750];
 * analyzeWages(wages);
 * ```
 *
 * @module
 */

/**
 * A great set of utilities for interacting with numbers. Serving 19 functions.
 *
 * _Note: Avoid using it as `const { fn } = NumberUtils`, it can cause issues._
 *
 * @version 1.0.0
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 */
export const NumberUtils = {
  isEven: (num: number) => num % 2 === 0,
  isOdd: (num: number) => num % 2 !== 0,
  // Description: Rounds a number to a specified decimal precision.
  // Usage: roundTo(3.14159, 2) returns 3.14.
  roundTo: (num: number, precision = 0) => Number(num.toFixed(precision)),
  // Description: Generates a random integer between min and max (inclusive).
  // Usage: randomInt(1, 10) returns a random number between 1 and 10.
  randomInt: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min,
  // Description: Checks if a number is prime.
  // isPrime(7) returns true, isPrime(8) returns false.
  isPrime: (num: number) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  },
  // Description: Returns the sum of all numbers in an array.
  // Usage: sum([1, 2, 3]) returns 6.
  sum: (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0),
  // Description: Returns the average of all numbers in an array.
  // Usage: average([1, 2, 3, 4]) returns 2.5.
  // TODO: use this.sum
  average: (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0) / arr.length,
  // Description: Checks if a number is between two values (inclusive).
  // Usage: isBetween(5, 1, 10) returns true, isBetween(15, 1, 10) returns false.
  isBetween: (num: number, min: number, max: number) => num >= min && num <= max,
  // Description: Calculates the factorial of a number.
  // Usage: factorial(5) returns 120.
  factorial: (num: number) => (num <= 1 ? 1 : num * (this as any).factorial(num - 1)),
  // Description: Checks if a number is a perfect square.
  // Usage: isPerfectSquare(16) returns true, isPerfectSquare(18) returns false.
  isPerfectSquare: (num: number) => Number.isInteger(Math.sqrt(num)),
  // Description: Converts degrees to radians.
  // Usage: degreesToRadians(180) returns 3.141592653589793.
  degreesToRadians: (deg: number) => (deg * Math.PI) / 180,
  // Description: Converts radians to degrees.
  // Usage: radiansToDegrees(Math.PI) returns 180.
  radiansToDegrees: (rad: number) => (rad * 180) / Math.PI,
  // Description: Finds the greatest common divisor (GCD) of two numbers.
  // Usage: gcd(12, 18) returns 6.
  gcd: (a: number, b: number) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  },
  // Description: Finds the least common multiple (LCM) of two numbers.
  // Usage: lcm(12, 18) returns 36.
  lcm: (a: number, b: number) => (a * b) / (this as any).gcd(a, b),
  // Description: Returns the absolute difference between two numbers.
  // Usage: absDiff(10, 3) returns 7.
  absDiff: (a: number, b: number) => Math.abs(a - b),
  // Description: Checks if a number is negative.
  // Usage: isNegative(-5) returns true, isNegative(3) returns false.
  isNegative: (num: number) => num < 0,
  // Description: Checks if a number is positive.
  // Usage: isPositive(5) returns true, isPositive(-2) returns false.
  isPositive: (num: number) => num > 0,
  // Description: Returns the smallest number in an array.
  // Usage: min([4, 2, 7, 1]) returns 1.
  min: (arr: number[]) => Math.min(...arr),
  // Description: Returns the biggest number in an array.
  // Usage: min([4, 2, 7, 1]) returns 7.
  max: (arr: number[]) => Math.max(...arr),
};
