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

// * SECTION: MODULE_DEF * //

type NumberUtilsModule = {
  /**
   * _A classic._ Checks if a given number is even or not. Analog to {@linkcode isOdd}.
   *
   * @param {number} num Number to check.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.isEven(2)); // true
   * console.log(NumberUtils.isEven(3)); // false
   * ```
   *
   * @returns {boolean} True if it's even, false if otherwise.
   */
  isEven(num: number): boolean;
  /**
   * _A classic._ Checks if a given number is odd or not. Analog to {@linkcode isEven}.
   *
   * @param {number} num Number to check.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.isOdd(2)); // false
   * console.log(NumberUtils.isOdd(3)); // true
   * ```
   *
   * @returns {boolean} True if it's odd, false if otherwise.
   */
  isOdd(num: number): boolean;
  /**
   * Rounds a given number to a specified decimal precision.
   *
   * @param {number} num Number to round.
   * @param {number} [precision=0] Amount of decimals to include. Defaults to 0.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.roundTo(3.14159, 2)) // 3.14
   * ```
   *
   * @returns {number} The rounded number.
   */
  roundTo(num: number, precision: number): number;
  /**
   * Generates a random integer between min and max (inclusive).
   *
   * @param {number} min Minimum number. Inclusive.
   * @param {number} max Maximum number. Inclusive.
   *
   * @example
   * ```ts
   * NumberUtils.randomInt(1, 10) // returns a random num between 1 and 10, e.g. "7"
   * NumberUtils.randomInt(65, 105) // returns a random num between 65 and 105, e.g. "81"
   * ```
   *
   * @returns {number} A random number between `min` and `max`.
   */
  randomInt(min: number, max: number): number;
  /**
   * Checks if a given number is prime.
   *
   * @param {number} num Number to check.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.isPrime(7)) // true
   * console.log(NumberUtils.isPrime(8)) // false
   * ```
   *
   * @returns {boolean} True if the given number is prime, false if otherwise.
   */
  isPrime(num: number): boolean;
  /**
   * Returns the sum of all numbers in an array.
   *
   * @param {number[]} arr Array of numbers.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.sumArray([1, 2, 3])) // 6
   * ```
   *
   * @returns {number} The sum of all numbers in the array.
   */
  sumArray(arr: number[]): number;
  /**
   * Returns the average of all numbers in an array.
   *
   * @param {number[]} arr Array of numbers.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.average([1, 2, 3, 4])) // 2.5
   * ```
   *
   * @returns {number} The average of all numbers in the array.
   */
  average(arr: number[]): number;
  /**
   * @param {number} num Number to check.
   * @param {number} min Minimum number. Inclusive.
   * @param {number} max Maximum number. Inclusive.
   *
   * @example
   * ```ts
   * isBetween(5, 1, 10); // true
   * isBetween(15, 1, 10); // false
   * ```
   *
   * @returns {boolean} True if the number is between `min` and `max`, false if otherwise.
   */
  isBetween(num: number, min: number, max: number): boolean;
  /**
   * Calculates the factorial of a number. For reference, the factorial of `n` (`n!`), is multiplying that number by each number below of it and above zero.
   *
   * @param {number} num Number to calculate the factorial for.
   *
   * @example
   * ```ts
   * factorial(5) // 120, since 5 * 4 * 3 * 2 * 1 = 120
   * ```
   *
   * @returns {number} The factorial of the given number.
   */
  factorial(num: number): number;
  /**
   * Checks if a number is a perfect square. For reference, a perfect square is a number that, when squared, returns an exact value.
   *
   * @param {number} num Number to check for.
   *
   * @example
   * ```ts
   * isPerfectSquare(16); // true
   * isPerfectSquare(18); // false
   * ```
   *
   * @returns {boolean} True if it's a perfect square, false if otherwise.
   */
  isPerfectSquare(num: number): boolean;
  /**
   * Converts degrees to radians.
   *
   * @param {number} deg Degrees.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.degreesToRadians(180)); // 3.141592653589793
   * ```
   *
   * @returns {number} Radians.
   */
  degreesToRadians(deg: number): number;
  /**
   * Converts radians to degrees.
   *
   * @param {number} rad Radians.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.radiansToDegrees(Math.PI)); // 180
   * ```
   *
   * @returns {number} Degrees.
   */
  radiansToDegrees(rad: number): number;
  /**
   * Finds the greatest common divisor (GCD) of two numbers.
   *
   * @param {number} a First number.
   * @param {number} b Second number.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.gcd(12, 18)); // 6.
   * ```
   *
   * @returns {number} The GCD of both numbers.
   */
  gcd(a: number, b: number): number;
  /**
   * Finds the least common multiple (LCM) of two numbers.
   *
   * @param {number} a First number.
   * @param {number} b Second number.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.lcm(12, 18)); // 36.
   * ```
   *
   * @returns {number} The LCM of both numbers.
   */
  lcm(a: number, b: number): number;
  /**
   * Returns the absolute difference between two numbers.
   *
   * @param {number} a First number.
   * @param {number} b Second number.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.absDiff(10, 3)); // 7
   * ```
   *
   * @returns {number} Their absolute difference.
   */
  absDiff(a: number, b: number): number;
  /**
   * _A classic._ Checks if a given number is negative or not. Analog to {@linkcode isPositive}.
   *
   * @param {number} num Number to check.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.isNegative(-2)); // true
   * console.log(NumberUtils.isNegative(3)); // false
   * ```
   *
   * @returns {boolean} True if it's negative, false if otherwise.
   */
  isNegative(num: number): boolean;
  /**
   * _A classic._ Checks if a given number is positive or not. Analog to {@linkcode isNegative}.
   *
   * @param {number} num Number to check.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.isPositive(-2)); // false
   * console.log(NumberUtils.isPositive(3)); // true
   * ```
   *
   * @returns {boolean} True if it's positive, false if otherwise.
   */
  isPositive(num: number): boolean;
  /**
   * Returns the smallest number in an array.
   *
   * @param {number[]} arr Array of numbers.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.min([4, 2, 7, 1])); // 1
   * ```
   *
   * @returns {number} The smallest number in the array.
   */
  min(arr: number[]): number;
  /**
   * Returns the highest number in an array.
   *
   * @param {number[]} arr Array of numbers.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.max([4, 2, 7, 1])); // 7
   * ```
   *
   * @returns {number} The highest number in the array.
   */
  max(arr: number[]): number;
};

// * SECTION: MODULE_ITSELF * //

/**
 * A great set of utilities for interacting with numbers. Serving 19 functions.
 *
 * _Note: Avoid using it as `const { fn } = NumberUtils`, it can cause issues._
 *
 * @version 1.0.0
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 */
export const NumberUtils: NumberUtilsModule = {
  isEven(num: number): boolean {
    return num % 2 === 0
  },

  isOdd(num: number): boolean {
    return num % 2 !== 0
  },

  roundTo(num: number, precision: number = 0): number {
    return Number(num.toFixed(precision))
  },

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  },

  sumArray(arr: number[]): number {
    return arr.reduce((acc, curr) => acc + curr, 0)
  },

  average(arr: number[]): number {
    return this.sumArray(arr) / arr.length
  },

  isBetween(num: number, min: number, max: number): boolean {
    return num >= min && num <= max
  },

  factorial(num: number): number {
    return (num <= 1 ? 1 : num * this.factorial(num - 1))
  },

  isPerfectSquare(num: number): boolean {
    return Number.isInteger(Math.sqrt(num))
  },

  degreesToRadians(deg: number): number {
    return (deg * Math.PI) / 180
  },

  radiansToDegrees(rad: number): number {
    return (rad * 180) / Math.PI
  },

  gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  },

  lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b)
  },

  absDiff(a: number, b: number): number {
    return Math.abs(a - b)
  },

  isNegative(num: number): boolean {
    return num < 0
  },

  isPositive(num: number): boolean {
    return num > 0
  },

  min(arr: number[]): number {
    return Math.min(...arr)
  },

  max(arr: number[]): number {
    return Math.max(...arr)
  },
};
