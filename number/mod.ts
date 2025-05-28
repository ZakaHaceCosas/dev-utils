/**
 * A great set of utilities for interacting with numbers. Serving 35 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @example
 * ```ts
 * import { average } from "@zakahacecosas/number-utils";
 *
 * const grades = [5, 7, 4, 9, 5, 6.1];
 * const averageGrade = average(grades); // get the avg
 * return `You scored an average of ${averageGrade}`;
 * ```
 *
 * @example
 * ```ts
 * import { roundTo, min, max } from "@zakahacecosas/number-utils";
 *
 * function analyzeWages(wages: number[]) {
 *   const avgWage = roundTo(average(avgWage), 2);
 *   const highestWage = max(avgWage);
 *   const lowestWage = min(avgWage);
 *
 *   console.log(`Average wage: ${avgWage}€`);
 *   console.log(`Highest wage: ${highestWage}€`);
 *   console.log(`Lowest wage: ${lowestWage}€`);
 * }
 *
 * const wages = [1800, 2200, 2500, 1900, 2750];
 * analyzeWages(wages);
 * ```
 *
 * @module
 */

// * SECTION: TYPES * //

/**
 * Options for combinatorial functions, {@linkcode possibilities}, {@linkcode combinations}, {@linkcode permutations}, and {@linkcode variations}.
 *
 * @export
 * @interface ICombinatorialOptions
 */
export interface ICombinatorialOptions {
  /** Whether elements are repeatable.
   *
   * Set it to true if, given options `1`, `2`, and `3`, `111` is considered a valid combination.
   */
  elementsCanRepeat?: boolean;
  /** Whether the order matters.
   *
   * Set it to false if, given options `A` and `B`, `AB` and `BA` are considered the same.
   *
   * When set to false, other settings from this interface are ignored.
   *
   * @default_value true
   */
  orderMatters?: boolean;
  /** Whether all elements will be used. This is used to determine the calculation method.
   *
   * Set it to false if not all elements are used. This is better understood with an example:
   * ```txt
   * Out of 10 people, 3 people can be elected to be part of a committee.
   * ```
   * In this case, `allElementsUsed` is false, since we are only using 3 out of 10 elements - yet the 10 elements count (as each of the 10 persons can be part of a possible combination).
   */
  allElementsUsed?: boolean;
}

// * SECTION: MODULE * //

/**
 * Converts degrees to radians.
 *
 * @param {number} deg Degrees.
 *
 * @example
 * ```ts
 * degreesToRadians(180); // 3.141592653589793
 * ```
 *
 * @returns {number} Radians.
 * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).
 */
export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Converts radians to degrees.
 *
 * @param {number} rad Radians.
 *
 * @example
 * ```ts
 * radiansToDegrees(Math.PI); // 180
 * ```
 *
 * @returns {number} Degrees.
 * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).
 */
export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

/**
   * Converts kilometers to miles.
   *
   * @param {number} km Kilometers.
   *
   * @example
   * ```ts
   * kilometersToMiles(5); // 3.106855
   * ```
      * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).

   * @returns {number} Miles.
   */
export function kilometersToMiles(km: number): number {
  return km * 0.621371;
}

/**
 * Converts miles to kilometers.
 *
 * @param {number} miles Miles.
 *
 * @example
 * ```ts
 * milesToKilometers(5); // 8.046722
 * ```
 *
 * @returns {number} Degrees.
 * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).
 */
export function milesToKilometers(miles: number): number {
  return miles / 0.621371;
}

/**
 * Converts meters to feet.
 *
 * @param {number} meters Meters.
 *
 * @example
 * ```ts
 * metersToFeet(5); // 16.4042
 * ```
 *
 * @returns {number} Feet.
 * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).
 */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

/**
 * Converts feet to meters.
 *
 * @param {number} feet Feet.
 *
 * @example
 * ```ts
 * feetToMeters(5); // 1.524
 * ```
 *
 * @returns {number} Meters.
 * @available Also served from [geo-utils](https://jsr.io/@zakahacecosas/geo-utils).
 */
export function feetToMeters(feet: number): number {
  return feet / 3.28084;
}

/**
 * _A classic._ Checks if a given number is even or not. Analog to {@linkcode isOdd}.
 *
 * @param {number} num Number to check.
 *
 * @example
 * ```ts
 * isEven(2); // true
 * isEven(3); // false
 * ```
 *
 * @returns {boolean} True if it's even, false if otherwise.
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * _A classic._ Checks if a given number is odd or not. Analog to {@linkcode isEven}.
 *
 * @param {number} num Number to check.
 *
 * @example
 * ```ts
 * isOdd(2); // false
 * isOdd(3); // true
 * ```
 *
 * @returns {boolean} True if it's odd, false if otherwise.
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * Rounds a given number to a specified decimal precision.
 *
 * @param {number} num Number to round.
 * @param {number} [precision=0] Amount of decimals to include. Defaults to 0.
 *
 * @example
 * ```ts
 * roundTo(3.14159, 2) // 3.14
 * ```
 *
 * @returns {number} The rounded number.
 */
export function roundTo(num: number, precision: number = 0): number {
  return Number(num.toFixed(precision));
}

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param {number} min Minimum number, inclusive.
 * @param {number} max Maximum number, inclusive.
 *
 * @example
 * ```ts
 * random(1, 10)   // returns a random num between 1 and 10, e.g. "7"
 * random(65, 105) // returns a random num between 65 and 105, e.g. "81"
 * ```
 *
 * @returns {number} A random number between `min` and `max`.
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if a given number is prime.
 *
 * @param {number} num Number to check.
 *
 * @example
 * ```ts
 * isPrime(7) // true
 * isPrime(8) // false
 * ```
 *
 * @returns {boolean} True if the given number is prime, false if otherwise.
 */
export function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}


/**
 * Returns the n-th prime number. **Computationally expensive.**
 *
 * @export
 * @param {number} index Index of the prime number, as in a JS array. Index 0 is number 2, for example.
 * 
 * @example
 * ```ts
 * primeAt(0); // 2
 * primeAt(3); // 7
 * primeAt(9999999999); // your PC has likely crashed at this point
 * ```
 * 
 * @returns {number} The prime number at the given index.
 */
export function primeAt(index: number): number {
  if (index < 0) throw new Error("Index must be a non-negative integer.");
  const primes: number[] = []
  let c = 0;
  let i = 0;
  while (primes.length <=  index) {
    console.log(primes)
    if (isPrime(c)) {
      primes.push(c);
      i++
    }
    c++;
  }
  return primes[index];
}

/**
 * Returns the sum of all numbers in an array.
 *
 * @param {number[]} arr Array of numbers.
 *
 * @example
 * ```ts
 * sumArray([1, 2, 3]) // 6
 * ```
 *
 * @returns {number} The sum of all numbers in the array.
 */
export function sumArray(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Returns the average of all numbers in an array.
 *
 * @param {number[]} arr Array of numbers.
 *
 * @example
 * ```ts
 * average([1, 2, 3, 4]) // 2.5
 * ```
 *
 * @returns {number} The average of all numbers in the array.
 */
export function average(arr: number[]): number {
  return sumArray(arr) / arr.length;
}

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
export function isBetween(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

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
export function factorial(num: number): number {
  return (num <= 1 ? 1 : num * factorial(num - 1));
}

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
export function isPerfectSquare(num: number): boolean {
  return Number.isInteger(Math.sqrt(num));
}

/**
 * Finds the greatest common divisor (GCD) of two numbers.
 *
 * @param {number} a First number.
 * @param {number} b Second number.
 *
 * @example
 * ```ts
 * gcd(12, 18); // 6.
 * ```
 *
 * @returns {number} The GCD of both numbers.
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * Finds the least common multiple (LCM) of two numbers.
 *
 * @param {number} a First number.
 * @param {number} b Second number.
 *
 * @example
 * ```ts
 * lcm(12, 18); // 36.
 * ```
 *
 * @returns {number} The LCM of both numbers.
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

/**
 * Returns the absolute difference between two numbers.
 *
 * @param {number} a First number.
 * @param {number} b Second number.
 *
 * @example
 * ```ts
 * absDiff(10, 3); // 7
 * ```
 *
 * @returns {number} Their absolute difference.
 */
export function absDiff(a: number, b: number): number {
  return Math.abs(a - b);
}

/**
 * _A classic._ Checks if a given number is negative or not. Analog to {@linkcode isPositive}.
 *
 * @param {number} num Number to check.
 *
 * @example
 * ```ts
 * isNegative(-2); // true
 * isNegative(3);  // false
 * ```
 *
 * @returns {boolean} True if it's negative, false if otherwise.
 */
export function isNegative(num: number): boolean {
  return num < 0;
}

/**
 * _A classic._ Checks if a given number is positive or not. Analog to {@linkcode isNegative}.
 *
 * @param {number} num Number to check.
 *
 * @example
 * ```ts
 * isPositive(-2); // false
 * isPositive(3);  // true
 * ```
 *
 * @returns {boolean} True if it's positive, false if otherwise.
 */
export function isPositive(num: number): boolean {
  return num > 0;
}

/**
 * Returns the smallest number in an array.
 *
 * @param {number[]} arr Array of numbers.
 *
 * @example
 * ```ts
 * min([4, 2, 7, 1]); // 1
 * ```
 *
 * @returns {number} The smallest number in the array.
 */
export function min(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * Returns the highest number in an array.
 *
 * @param {number[]} arr Array of numbers.
 *
 * @example
 * ```ts
 * max([4, 2, 7, 1]); // 7
 * ```
 *
 * @returns {number} The highest number in the array.
 */
export function max(arr: number[]): number {
  return Math.max(...arr);
}

/**
 * Turns centimeters (CM) to inches (IN).
 *
 * @param {number} cms Centimeters.
 *
 * @example
 * ```ts
 * centimetersToInches(10); // 3.94
 * ```
 *
 * @returns {number} Inches.
 */
export function centimetersToInches(cms: number): number {
  return cms / 2.54;
}

/**
 * Turns inches (IN) to centimeters (CM).
 *
 * @param {number} ins Inches.
 *
 * @example
 * ```ts
 * inchesToCentimeters(10); // 25.4
 * ```
 *
 * @returns {number} Inches.
 */
export function inchesToCentimeters(ins: number): number {
  return ins * 2.54;
}

/**
 * Turns Celsius (ºC) to Fahrenheit (ºF). Analog to {@linkcode fahrenheitToCelsius}.
 *
 * @param {number} celsius Celsius.
 *
 * @example
 * ```ts
 * celsiusToFahrenheit(25); // 77
 * ```
 *
 * @returns {number} Fahrenheit.
 */
export function celsiusToFahrenheit(celsius: number): number {
  return ((celsius * 1.8) + 32);
}

/**
 * Turns Fahrenheit (ºF) to Celsius (ºC). Analog to {@linkcode celsiusToFahrenheit}.
 *
 * @param {number} fahrenheit Celsius.
 *
 * @example
 * ```ts
 * fahrenheitToCelsius(104); // 40
 * ```
 *
 * @returns {number} Celsius.
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * (1 / 1.8));
}

/**
 * Turns kilometers per hour (KPH or KM/H) to Miles per hour (MPH). Analog to {@linkcode milesPerHourToKilometersPerHour}.
 *
 * @param {number} kph KPH.
 *
 * @example
 * ```ts
 * kilometersPerHourToMilesPerHour(180); // 111.846815
 * ```
 *
 * @returns {number} MPH.
 */
export function kilometersPerHourToMilesPerHour(kph: number): number {
  return kph / 1.609344;
}

/**
 * Turns Miles per hour (MPH) to Kilometers per hour (KPH or KM/H). Analog to {@linkcode milesPerHourToKilometersPerHour}.
 *
 * @param {number} mph MPH.
 *
 * @example
 * ```ts
 * milesPerHourToKilometersPerHour(180); // 289.68192
 * ```
 *
 * @returns {number} MPH.
 */
export function milesPerHourToKilometersPerHour(mph: number): number {
  return mph * 1.609344;
}

/**
 * Calculates the number of combinations of `n` items taken `r` at a time.
 *
 * @param {number} n Total number of items.
 * @param {number} r Number of items to choose.
 *
 * @example
 * ```ts
 * combinations(5, 3); // 10
 * ```
 *
 * @returns {number} The number of combinations.
 */
export function combinations(n: number, r: number): number {
  if (r > n || 0 >= n || 0 >= r) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

/**
 * Calculates the number of permutations of `n` items.
 *
 * @param {number} n Total number of items.
 *
 * @example
 * ```ts
 * permutations(5); // 120
 * ```
 *
 * @returns {number} The number of permutations.
 */
export function permutations(n: number): number {
  if (0 >= n) return 0;
  return factorial(n);
}

/**
 * Calculates the number of variations of `n` items taken `r` at a time.
 *
 * @param {number} n Total number of items.
 * @param {number} r Number of items to choose.
 *
 * @example
 * ```ts
 * variations(5, 3); // 60
 * ```
 *
 * @returns {number} The number of variations.
 */
export function variations(n: number, r: number): number {
  if (r > n || 0 >= n || 0 >= r) return 0;
  return factorial(n) / factorial(n - r);
}

/**
 * Calculates the number of variations of `n` items taken `r` at a time, with repetitions.
 *
 * @param {number} n Total number of items.
 * @param {number[]} rs Array of repetitions for each item.
 *
 * @example
 * ```ts
 * variationsR(5, [2, 3]); // 10
 * ```
 *
 * @returns {number} The number of variations with repetitions.
 */
export function permutationsR(n: number, rs: number[]): number {
  if (sumArray(rs) !== n) return 0;
  return (factorial(n) / (rs.reduce((acc, curr) => acc * factorial(curr))));
}

/**
 * Calculates the number of variations of `n` items taken `r` at a time, with repetitions.
 *
 * @param {number} n Total number of items.
 * @param {number} r Number of items to choose.
 *
 * @example
 * ```ts
 * variationsR(5, 3); // 125
 * ```
 *
 * @returns {number} The number of variations with repetitions.
 */
export function variationsR(n: number, r: number): number {
  if (r > n || 0 >= n || 0 >= r) return 0;
  return Math.pow(n, r);
}

/**
 * Calculates the number of possibilities of a given set of options.
 *
 * @param {number} options Total number of options.
 * @param {number | number[]} possibleCombinations Number of possible combinations.
 * @param {ICombinatorialOptions} settings Settings for the calculation.
 *
 * @example
 * ```ts
 * "Given the numbers 1, 2, and 3, how many combinations of 2 can I make?"
 * possibilities(3, 2, { elementsCanRepeat: false, orderMatters: false }); // 3
 * ```
 *
 * @returns {number} The number of possibilities.
 */
export function possibilities(
  options: number,
  possibleCombinations: number | number[],
  settings: ICombinatorialOptions,
): number {
  const { elementsCanRepeat = false, orderMatters = false, allElementsUsed = false } = settings;
  if (!orderMatters) {
    if (Array.isArray(possibleCombinations)) throw new Error("Impossible to calculate.");
    return combinations(options, possibleCombinations);
  }
  if (!elementsCanRepeat) {
    if (Array.isArray(possibleCombinations)) throw new Error("Impossible to calculate.");
    if (allElementsUsed) return permutations(options);
    return variations(options, possibleCombinations);
  }
  if (!allElementsUsed) {
    if (Array.isArray(possibleCombinations)) throw new Error("Impossible to calculate.");
    return variationsR(options, possibleCombinations);
  }
  if (!Array.isArray(possibleCombinations)) throw new Error("Impossible to calculate.");
  return permutationsR(options, possibleCombinations);
}
