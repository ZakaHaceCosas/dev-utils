/**
 * A great set of utilities for interacting with strings. Serving 57 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @example
 * ```ts
 * import { validate, normalize, type UnknownString } from "@zakahacecosas/string-utils";
 *
 * const searchQuery: UnknownString = getSearchQuery() // example
 * if (!validate(searchQuery)) return []; // ensure it's not an empty or undefined string
 *
 * const cleanSearchQuery = normalize(searchQuery); // normalize accents, trailing space, etc...
 * return searchResults(cleanSearchQuery); // example
 * ```
 *
 * @example
 * ```ts
 * import { toTitleCase, capitalizeWords } from "@zakahacecosas/string-utils";
 *
 * function createBook(title: string, author: string) {
 *  const bookTitle = toTitleCase(title);
 *  const bookAuthor = capitalizeWords(author);
 *
 *  return {
 *   bookTitle,
 *   bookAuthor,
 *   publishedAt: new Date(),
 *   ISBN: getIsbn()
 *  }
 * }
 *
 * const book = createBook("war and peace", "sir john doe");
 * console.log(book.bookTitle, book.bookAuthor) // "War and Peace, Sir John Doe"
 * ```
 *
 * @module
 */

// deno-lint-ignore-file no-explicit-any
import process from "node:process";

// * SECTION: TYPES * //

/**
 * A variable that's _possibly_ a string. Things like `""` or `"    "` aren't considered strings.
 *
 * Use this for values you _don't know_ if they're a string or not. User-input-dependant variables are a good example. Functions like {@linkcode validate} use this and not `string` as the parameter type - speaking of which, **you should use {@linkcode validate} to check if an `UnknownString` is valid or not.**
 */
export type UnknownString = undefined | null | string | "";

/**
 * Options for {@linkcode normalize}.
 *
 * @interface INormalizeOptions
 */
export interface INormalizeOptions {
  /**
   * If true, it'll also remove underscores, hyphens, and other non-alphanumeric characters.
   *
   * @default_value false;
   * @type {?boolean}
   */
  strict?: boolean;
  /**
   * If true, casing will be preserved.
   *
   * @default_value false;
   * @type {?boolean}
   */
  preserveCase?: boolean;
  /**
   * If true, it'll also remove CLI-coloring control characters.
   *
   * @default_value false;
   * @type {?boolean}
   */
  removeCliColors?: boolean;
}

/**
 * Options for the {@linkcode testFlag} and {@linkcode testFlags}.
 *
 * @interface ITestFlagOptions
 */
export interface ITestFlagOptions {
  /**
   * If false, it won't allow single-dash flags (e.g. `-my-flag`).
   *
   * @default_value true;
   * @type {?boolean}
   */
  allowSingleDash?: boolean;
  /**
   * If true, the first letter of the given target will also work (e.g. `-t` for `--test`). It works best with `allowSingleDash` set to true (its default value anyway).
   *
   * @default_value false;
   * @type {?boolean}
   */
  allowQuickFlag?: boolean;
  /**
   * If false, the given string won't be normalized before testing, forcing it to exactly equal a target flag.
   * Keep in mind we'll still trim the string, so for example `"--test "` will return `true` for a `"test"` target regardless of this setting.
   *
   * @default_value true;
   * @type {?boolean}
   */
  allowNonExactString?: boolean;
}

/**
 * Options for the `mask(str, options)` and `maskEmail(str, options)` utilities.
 *
 * @interface IMaskOptions
 */
export interface IMaskOptions {
  /**
   * Character to be used as a mask.
   *
   * @default_value "*";
   * @type {?boolean}
   */
  maskChar?: string;
  /**
   * Amount of final characters that should be visible.
   *
   * @default_value 2;
   * @type {?number}
   */
  visibleChars?: number;
}

// * SECTION: CLASSES * //

/**
 * This is a string-only array with additional, chainable methods.
 *
 * It cannot be nested. Pushing operations that include nesting (`["a", ["b"]]`) will undergo flattening.
 *
 * **While it should resemble a normal JS array properly at all times, rarely it might behave differently (e.g. failing an equality assertion with an equal, standard array). Use the `.arr()` method of this class to generate a standard array.**
 *
 * ---
 *
 * @example
 * ```ts
 * const arr = ["a", "b", "c", 5, ["d", "e"]];
 * const strArr = new StringArray(arr);
 * // ["a", "b", "c", "d", "e"]
 *
 * strArr.uppercaseAll();
 * // ["A", "B", "C", "D", "E"]
 * ```
 *
 * ---
 *
 * By default, these methods mutate the existing StringArray. You can pass `false` to any method that shows in your editor the `@dynamic_mutability` JSDoc tag in order to _return_ the modified StringArray instead of mutating the existing StringArray.
 *
 * @example
 * ```ts
 * const otherArr = new StringArray("a", "b", "c", "d", "e");
 * const changedArr = otherArr.uppercaseAll(false);
 * // otherArr  : ["a", "b", "c", "d", "e"]
 * // changedArr: ["A", "B", "C", "D", "E"]
 * ```
 */
export class StringArray extends Array<string> {
  /**
   * Constructs a `StringArray`. This is a string-only array with additional, chainable methods.
   *
   * It cannot be nested. Pushing operations that include nesting (`["a", ["b"]]`) will undergo flattening.
   */
  constructor(...input: any[]) {
    super();

    const flattened = input.flat(Infinity);
    const filtered = flattened.filter((item) => typeof item === "string");

    this.push(...filtered);
    Object.setPrototypeOf(this, StringArray.prototype);
  }

  /** Internal method to mutate (overwrite) this instance of StringArray. */
  #overwriteInstance(i: string[]) {
    this.length = 0;
    this.push(...i);
    return this;
  }

  /**
   * Generates a StringArray from the {@linkcode kominator} function.
   *
   * @static
   * @param {string} st String to kominate.
   * @param {string} [se=","] Separator. Defaults to a comma.
   * @returns {StringArray} A new StringArray.
   */
  static fromKominator(st: string, se: string = ","): StringArray {
    return new StringArray(kominator(st, se));
  }

  /**
   * Turns the `StringArray` into a normal `Array<string>` / `string[]`, for the sake of compatibility.
   *
   * @public
   * @returns A normal `string[]`.
   */
  public arr(): string[] {
    return Array.from(this);
  }

  /**
   * Turns all string from the StringArray into uppercase, returning a new StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Uppercase StringArray
   */
  public uppercaseAll(mutate?: false): StringArray;
  /**
   * Turns all string from the StringArray into uppercase, mutating the existing StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Uppercase StringArray
   */
  public uppercaseAll(mutate?: true): this;
  public uppercaseAll(mutate?: boolean): this | StringArray {
    const _mt = mutate ?? true;

    if (!_mt) return new StringArray(this.map((s) => s.toUpperCase()));

    for (let i = 0; i < this.length; i++) {
      this[i] = this[i].toUpperCase();
    }
    return this;
  }

  /**
   * Turns all string from the StringArray into lowercase, returning a new StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Lowercase StringArray
   */
  public lowercaseAll(mutate?: false): StringArray;
  /**
   * Turns all string from the StringArray into lowercase, mutating the existing StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Lowercase StringArray
   */
  public lowercaseAll(mutate?: true): this;
  public lowercaseAll(mutate?: boolean): this | StringArray {
    const _mt = mutate ?? true;

    if (!_mt) return new StringArray(this.map((s) => s.toLowerCase()));

    // this seems more efficient than #overwriteInstance, actually...
    for (let i = 0; i < this.length; i++) {
      this[i] = this[i].toLowerCase();
    }
    return this;
  }

  /**
   * Alphabetically sorts items within the StringArray, returning a new StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Sorted StringArray
   */
  public sortAlphabetically(mutate?: false): StringArray;
  /**
   * Alphabetically sorts items within the StringArray, mutating the existing StringArray.
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Sorted StringArray
   */
  public sortAlphabetically(mutate?: true): this;
  public sortAlphabetically(mutate?: boolean): this | StringArray {
    const _mt = mutate ?? true;

    if (!_mt) return new StringArray(sortAlphabetically(this));

    const sorted = sortAlphabetically(this);
    this.#overwriteInstance(sorted);

    return this;
  }

  /**
   * Cleans the StringArray up, returning a new StringArray. Filters out any string that isn't valid (as per {@linkcode validate}'s definition of a valid string).
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Clean array.
   */
  public cleanup(mutate?: false): StringArray;
  /**
   * Cleans the StringArray up, mutating the existing StringArray. Filters out any string that isn't valid (as per {@linkcode validate}'s definition of a valid string).
   *
   * @public
   * @dynamic_mutability 1st arg.
   * @returns {StringArray} Clean array.
   */
  public cleanup(mutate?: true): this;
  public cleanup(mutate?: boolean): this | StringArray {
    const _mt = mutate ?? true;
    const valid = this.filter((s) => validate(s));

    if (!_mt) return new StringArray(valid);

    this.#overwriteInstance(valid);

    return this;
  }

  /**
   * Normalizes items within the StringArray, returning a new StringArray.
   *
   * @public
   * @param {"softer" | "soft" | "normal" | "strict"} [options] Options for the normalizer.
   * @dynamic_mutability 2nd arg.
   * @returns {StringArray} Normalized StringArray
   */
  public normalize(intensity?: "softer" | "soft" | "normal" | "strict", mutate?: false): StringArray;
  /**
   * Normalizes items within the StringArray, mutating the existing StringArray.
   *
   * @public
   * @param {"softer" | "soft" | "normal" | "strict"} [options] Options for the normalizer.
   * @dynamic_mutability 2nd arg.
   * @returns {StringArray} Normalized StringArray
   */
  public normalize(intensity?: "softer" | "soft" | "normal" | "strict", mutate?: true): this;
  public normalize(intensity?: "softer" | "soft" | "normal" | "strict", mutate?: boolean): this | StringArray {
    const _mt = mutate ?? true;
    const intensityToUse = intensity ?? "normal";

    if (!_mt) return new StringArray(normalizeArray(this, intensityToUse));

    const normalized = normalizeArray(this, intensityToUse);
    this.#overwriteInstance(normalized);

    return this;
  }

  /**
   * Appends new strings to the end of the array, and returns the new length of the array. This is an overridden method. It doesn't work the same way as `Array.push()` does.
   *
   * @override
   * @param {...(any | any[])[]} items New elements to add to the array. If they aren't a string, they'll be ignored.
   * @returns {number} Length of the StringArray after the push operation.
   */
  override push(...items: (any | any[])[]): number {
    const validItems = items.flat(Infinity).filter((i) => validate(i));
    return super.push(...validItems);
  }
}

// * SECTION: MODULE * //

/**
 * Capitalizes the first letter of the string.
 * @param str The string to modify.
 *
 * @example
 * ```ts
 * const str = toUpperCaseFirst("deno the Runtime");
 * console.log(str); // Deno the Runtime
 * ```
 *
 * @returns The string with the first letter capitalized.
 */
export function toUpperCaseFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Lowercases the first letter of the string.
 * @param str The string to modify.
 *
 * @example
 * ```ts
 * const str = toLowerCaseFirst("Deno the Runtime");
 * console.log(str); // deno the Runtime
 * ```
 *
 * @returns The string with the first letter in lowercase.
 */
export function toLowerCaseFirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in the string.
 * @param str The string to modify.
 *
 * @example
 * ```ts
 * const str = capitalizeWords("deno the javaScript runtime");
 * console.log(str); // Deno The JavaScript Runtime
 * ```
 *
 * @returns The string with each word capitalized.
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Capitalizes the first letter of each word except small words, like "the" or "and".
 * @param str The string to modify.
 *
 * @example
 * ```ts
 * const str = toTitleCase("deno the javaScript runtime");
 * console.log(str); // Deno the JavaScript Runtime
 * ```
 *
 * @returns The string with title-case formatting.
 */
export function toTitleCase(str: string): string {
  const smallWords = [
    "and",
    "or",
    "but",
    "the",
    "in",
    "on",
    "of",
    "for",
    "with",
  ];
  return str
    .split(" ")
    .map((word, index) =>
      smallWords.includes(word.toLowerCase()) && index !== 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

/**
 * Reverses the characters of a string.
 * @param str The string to reverse.
 *
 * @example
 * ```ts
 * const str = reverseString("Deno");
 * console.log(str); // oneD
 * ```
 *
 * @returns The reversed string.
 */
export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

/**
 * Removes all whitespace from the string.
 * @param {string} str The string to modify.
 *
 * @example
 * ```ts
 * const str = removeWhitespace("One Two Three!");
 * console.log(str); // OneTwoThree!
 * ```
 *
 * @returns The string without any whitespace.
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, "");
}

/**
 * Removes all vowels from a string.
 * @param {string} str The string to modify.
 *
 * @example
 * ```ts
 * const str = removeVowels("One Two Three!");
 * console.log(str); // ne Tw Thr!
 * ```
 *
 * @returns The string without any vowel.
 */
export function removeVowels(str: string): string {
  return str.replace(/[aeiou]/gi, "");
}

/**
 * Removes all consonants from a string.
 * @param {string} str The string to modify.
 *
 * @example
 * ```ts
 * const str = removeConsonants("One Two Three!");
 * console.log(str); // Oe To ee!
 * ```
 *
 * @returns The string without any vowel.
 */
export function removeConsonants(str: string): string {
  return str.replace(/[^aeiou]/gi, "");
}

/**
 * Truncates a string to a specified length and appends "..." if needed.
 * @param {string} str The string to truncate.
 * @param {number} length The length to truncate to.
 * @param {boolean} smartTruncate If true, instead of always truncating to the exact length you specified, we'll shorten the string a bit if needed by removing trailing characters from the last word, leaving a clean string.
 *
 * @example
 * ```ts
 * // normal (exact) truncate
 * const str = truncate("Hello world!", 7);
 * console.log(str) // Hello w...
 * // smart truncate
 * const strTwo = truncate("Hello world!", 7, true);
 * console.log(strTwo) // Hello...
 * ```
 *
 * @returns The truncated string.
 */
export function truncate(str: string, length: number, smartTruncate: boolean = false): string {
  if (str.length <= length) return str;
  const exactCut = str.substring(0, length) + "...";
  const smartCut = str.slice(0, str.lastIndexOf(" ", length)) + "...";
  return smartTruncate ? smartCut : exactCut;
}

/**
 * Same as {@linkcode truncate}, but truncates to a specified amount of words instead of characters.
 * @param {string} str The string to truncate.
 * @param {number} length The amount of words to truncate to.
 *
 * @example
 * ```ts
 * const str = truncateWords("Hello, world! How are you all?", 3);
 * console.log(str) // Hello, world! How...
 * ```
 *
 * @returns The truncated string.
 */
export function truncateWords(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.split(" ").slice(0, length).join(" ") + "...";
}

/**
 * Takes an argument that's _possibly_ a string and returns true if it is valid. `null` and `undefined` are obviously not valid, but (here's the cool thing), things like `""` or `"        "` are also not valid. This function makes 100% you have _something_ in the string.
 * @param {string} str The string to test.
 *
 * @example
 * ```ts
 * const argument: UnknownString = Deno.args[1];
 * // Deno.args[1] is maybe not defined, or maybe an empty string which you might don't want
 *
 * if (!validate(argument)) {
 *    throw new Error("No argument given!");
 * }
 * console.log("Arg:", secondCliArgument); // here we know it's valid
 * ```
 *
 * @returns True if it's valid and false if otherwise.
 */
export function validate(str: UnknownString): str is string {
  if (
    str === undefined || str === null || typeof str !== "string" ||
    normalize(str) === ""
  ) {
    return false;
  }

  return true;
}

/**
 * Takes an argument that's _possibly_ a string and validates it against a fixed array of strings.
 * If you pass `["a", "b"]` to the validator and the string happens to be valid, the return type won't be `string` but `"a" | "b"` instead.
 *
 * @param {unknown} str The string to test.
 * @param {readonly T[]} against The array of valid strings to test against.
 *
 * @example
 * ```ts
 * function greet(greeting: "hi" | "hello") { ... };
 * const argument: string = "hello";
 *
 * greet(argument); // Error: Can't assign type 'string' to type '"hi" | "hello"'
 *
 * if (validateAgainst(argument, ["hi", "hello"])) {
 *    greet(argument); // works!
 * }
 * ```
 *
 * @returns True if it's valid and false if otherwise.
 */
export function validateAgainst<T extends string>(str: unknown, against: readonly T[]): str is T {
  return typeof str === "string" && validate(str as T) &&
    against.includes(str as T);
}
/**
 * Returns the last character of a string.
 *
 * @param {string} str The string to look inside of.
 *
 * @example
 * ```ts
 * console.log(getLastChar("Hello!")) // outputs "!"
 * ```
 *
 * @returns {string} The last character of the string.
 */
export function getLastChar(str: string): string {
  return str.charAt(str.length - 1);
}

/**
 * Returns the given string with all CLI coloring control characters removed (`\x1b` and `\e` codes).
 * In case you have a formatted string (CLI-colored) and want to compare it to a regular string, use this function - otherwise control characters will make JS think strings are different even if they aren't.
 *
 * @param {string} str The string to strip CLI colors from.
 *
 * @example
 * ```ts
 * console.log("\x1b[31mRED TEXT"); // outputs "\x1b[31mRED TEXT"
 * const str = stripCliColors("\x1b[31mRED TEXT");
 * console.log(str) // outputs "RED TEXT"
 * ```
 *
 * @returns {string} The clean string.
 */
export function stripCliColors(str: string): string {
  return str
    // deno-lint-ignore no-control-regex
    .replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "")
    .replace(/\e\[[0-9;?]*[ -/]*[@-~]/g, "");
}

/**
 * Normalizes a string so it's easier to work with it. Removes external and internal trailing spaces, lowercases the string, and normalizes accents too.
 *
 * @param {string} str The string to normalize.
 * @param {?INormalizeOptions} options Options for the normalizer.
 *
 * @example
 * ```ts
 * const query = "   mY  sEaRcH      qUÉry_1  "
 *
 * const str1 = normalize(query)
 * const str2 = normalize(query, { strict: true })
 * const str3 = normalize(query, { preserveCase: true })
 * console.log(str1); // "my search query_1"
 * console.log(str2); // "mysearchquery1"
 * console.log(str3); // "mY sEaRch qUEry_1"
 * ```
 *
 * @returns {string} The normalized string.
 */
export function normalize(
  str: string,
  options?: INormalizeOptions,
): string {
  const { preserveCase, strict, removeCliColors } = options ?? {
    preserveCase: false,
    strict: false,
    removeCliColors: false,
  };
  const normalizedStr = str
    .normalize("NFD") // normalize á, é, etc.
    .replace(/[\u0300-\u036f]/g, "") // remove accentuation
    .replace(/\s+/g, " ") // turn "my      search  query" into "my search query"
    .trim() // turn "      my search query   " into "my search query"
    .replace(strict ? /[\s\W_]/g : "", ""); // remove ANY special char

  const strippedStr = removeCliColors ? stripCliColors(normalizedStr) : normalizedStr;
  const finalStr = preserveCase ? strippedStr : strippedStr.toLowerCase();

  return finalStr;
}

/**
 * Alphabetically sorts an array of strings. Returns a new, sorted array.
 *
 * @param {string[]} strArr The string array to be sorted.
 *
 * @example
 * ```ts
 * const sortedArr = sortAlphabetically(["zulu", "bravo", "delta", "alpha"]);
 * console.log(sortedArr); // ["alpha", "bravo", "delta", "zulu"]
 * ```
 *
 * @returns {string[]} The sorted array.
 */
export function sortAlphabetically(strArr: string[]): string[] {
  return strArr.toSorted((a: string, b: string) => normalize(a).localeCompare(normalize(b)));
}

/**
 * Prepends, appends, or both, whitespace to a string.
 *
 * @param {string} str String to space.
 * @param {number} spaceBefore Space to be added before the actual string.
 * @param {number} spaceAfter Space to be added after the actual string.
 *
 * @example
 * ```ts
 * const str = spaceString("text", 2, 4);
 * console.log(str); // "  text    "
 * ```
 *
 * @returns {string} The spaced string.
 */
export function spaceString(str: string, spaceBefore: number, spaceAfter: number): string {
  function space(n: number): string {
    return n === 0 ? "" : " ".repeat(n);
  }
  return `${space(spaceBefore)}${str}${space(spaceAfter)}`;
}

/**
 * Returns true if the given string is a palindrome. This means, it reads the same forwards and backwards.
 *
 * @param {string} str The string to check.
 * @param {boolean} strict If true, string will be normalized before checking (so for example an "?" at the end won't stop a string from being considered a palindrome).
 *
 * @example
 * ```ts
 * const str = "Hannah"
 * console.log(isPalindrome(str)) // true
 * ```
 *
 * @returns {boolean} Whether it's a palindrome or not.
 */
export function isPalindrome(str: string, strict: boolean = false): boolean {
  const normalized = normalize(str, { strict });
  return normalized === reverseString(normalized);
}

/**
 * Returns true if the given strings are anagrams. This means, `strA` is equal to `strB` reversed.
 *
 * @param {string} strA The string to check against.
 * @param {string} strB The string to check for.
 *
 * @example
 * ```ts
 * console.log(isAnagram("hi bro!", "!orb ih")) // true
 * ```
 *
 * @returns {boolean} Whether it's a palindrome or not.
 */
export function isAnagram(strA: string, strB: string): boolean {
  return normalize(strA) === reverseString(normalize(strB));
}

/**
 * Takes a string array and returns it with all strings normalized and invalid strings removed.
 *
 * @param {UnknownString[]} strArr Array of strings.
 * @param {"softer" | "soft" | "normal" | "strict"} [intensity="normal"] Optional, defaults to "normal". For better preservation of strings, use "soft" (or "softer" to preserve casing). For stricter normalization, use "strict".
 *
 * @example
 * ```ts
 * const strArr = ["    hIi ", "", "", " yés! ", ""]
 * console.log(normalizeArray(strArr)) // ["hii", "yes!"]
 * ```
 *
 * @returns {string[]} Array of normalized strings.
 */
export function normalizeArray(
  strArr: UnknownString[],
  intensity: "softer" | "soft" | "normal" | "strict" = "normal",
): string[] {
  if (intensity === "soft" || intensity === "softer") {
    return strArr.filter((str) => validate(str)).map((str) => {
      return (intensity === "softer") ? str.trim().toLowerCase() : str.trim();
    });
  }

  const options: INormalizeOptions = intensity === "strict"
    ? { strict: true, removeCliColors: true, preserveCase: false }
    : {};

  const validated = strArr.filter((str) => validate(str));
  return validated.map((str) => normalize(str, options));
}

/**
 * Takes a `{"K": "V"}` value pair array and returns a formatted table string. Similar to `console.table()`, but allows to passed CLI-formatted strings.
 *
 * @param {Record<string, string | number | unknown[]>[]} strArr Array of KV pairs.
 *
 * @example
 * ```ts
 * const strArr = [{"Name": "Zaka", "Age": 55}]
 * console.log(table(strArr))
 * // ┌──────────────────────┬──────────────────────┐
 * // │ Name                 │ Age                  │
 * // ├──────────────────────┼──────────────────────┤
 * // │ Zaka                 │ 55                   │
 * // └──────────────────────┴──────────────────────┘
 *
 * ```
 *
 * @returns {string} Formatted table.
 */
export function table(strArr: Record<string, string | number | unknown[]>[]): string {
  if (strArr.length === 0) return "No data to display.";

  /** Separator characters */
  const chars = {
    y: " │ ",
    x: "─",
    full: "┼",
    xDown: "┬",
    xUp: "┴",
    yLeft: "├",
    yRight: "┤",
    xlUp: "┌",
    xlDown: "└",
    xrUp: "┐",
    xrDown: "┘",
  };
  const headers: string[] = Object.keys(strArr[0]);
  // compute max width for each column (including headers)
  const columnWidths: number[] = headers.map((header) =>
    Math.max(
      header.length,
      ...strArr.map((row) => {
        const str = row[header]?.toString() ?? "";
        const strLength = normalize(str, { removeCliColors: true }).length;
        return (strLength + 1);
      }),
    )
  );

  const fmtCell = (value: string, index: number): string => {
    const diff = value.trim().length -
      normalize(value, { removeCliColors: true }).length;
    return value.trim().padEnd(columnWidths[index] + diff);
  };

  // create the separator rows
  const createSeparator = (left: string, middle: string, right: string): string => {
    return `${left}${columnWidths.map((w) => chars.x.repeat(w + 2)).join(middle)}${right}`;
  };

  const separators = {
    middle: createSeparator(chars.yLeft, chars.full, chars.yRight),
    top: createSeparator(chars.xlUp, chars.xDown, chars.xrUp),
    bottom: createSeparator(chars.xlDown, chars.xUp, chars.xrDown),
  };

  // format headers
  const headerRow: string = `${chars.y.trimStart()}${
    headers.map((h, i) => fmtCell(h, i)).join(chars.y)
  }${chars.y.trimEnd()}`;

  // format data rows
  try {
    const dataRows = strArr.map((row) =>
      headers.map((header, i) => {
        if (!row[header] || !validate(row[header]?.toString() ?? "")) {
          throw new Error(
            `Unable to represent data. Row ${Object.entries(row)} is not consistent with the rest of the table.`,
          );
        }
        const value = row[header].toString();
        return fmtCell(value, i);
      }).join(chars.y)
    );

    // construct the table
    return [
      separators.top,
      headerRow,
      separators.middle,
      ...dataRows.map((row) => `│ ${row} │`),
      separators.bottom,
    ].join("\n");
  } catch (e) {
    return String(e);
  }
}

/**
 * Takes a string and splits it using commas (or a custom separator string), returning an array of separated strings. Borrowed from [here](https://github.com/SokoraDesu/Sokora/blob/dev/src/utils/kominator.ts).
 *
 * @example
 * ```ts
 * const str = "alpha,bravo,charlie";
 * console.log(kominator(str)); // ["alpha", "bravo", "charlie"]
 * ```
 *
 * @param {string} str String to be splitted.
 * @param {?string} [separator=","] Separator string. Defaults to a comma.
 * @returns {string[]} Array of split strings.
 */
export function kominator(str: string, separator: string = ","): string[] {
  return str.split(separator).map((s) => s.replace('"', "").trim());
}

/**
 * Takes a string and "reveals" it - it shows it in the CLI making it appear character by character. **Async.**
 *
 * @async
 * @example
 * ```ts
 * await reveal("Loading...", 35);
 * // this will print a letter every 35 milliseconds until the string is fully printed.
 * ```
 *
 * @param {string} str String to be revealed.
 * @param {?number} [delay=50] Delay for each char to be shown, in milliseconds. Defaults to 50.
 * @returns {Promise<void>} A Promise. It `console.log()`s the string to the standard output.
 */
export async function reveal(str: string, delay: number = 50): Promise<void> {
  for (const char of str) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    process.stdout.write(new TextEncoder().encode(char));
  }
  console.log(); // Move to the next line after completing
}

/**
 * Counts the occurrences of a substring within a string.
 *
 * @param str The string to search in.
 * @param search The substring to count occurrences of.
 *
 * @example
 * ```ts
 * const count = countOccurrences("hello world, hello again", "hello");
 * console.log(count); // 2
 * ```
 *
 * @returns The number of times the substring appears in the string.
 */
export function countOccurrences(str: string, search: string): number {
  return (str.split(search).length - 1);
}

/**
 * Counts the amount of words in a string.
 *
 * TODO - For next major, rename to `amountOfWords` and make `countWords` return a Record like `countChars` does.
 *
 * @param str The string to count inside of.
 *
 * @example
 * ```ts
 * const count = countWords("this is a sentence");
 * console.log(count); // 4
 * ```
 *
 * @returns The number of words.
 */
export function countWords(str: string): number {
  return normalize(str).split(" ").length;
}

/**
 * Counts all characters inside of a string and returns a record using each char as a key and its frequency as a value.
 *
 * Whitespace is included and split into characters - in other words, `"a  a"` returns `{ "a": 2, " ": 2 }` (two `a`s and two ` `s).
 *
 * @param {string} str String to count inside of.
 *
 * @example
 * ```ts
 * countChars("hello chat!");
 * // {
 * //    "h": 2,
 * //    "e": 1,
 * //    "l": 2,
 * //    "o": 1,
 * //    " ": 1,
 * //    "c": 1,
 * //    "a": 1,
 * //    "t": 1,
 * //    "!": 1,
 * // }
 * ```
 *
 * @returns {Record<string,number>} A record with char counts.
 */
export function countChars(str: string): Record<string, number> {
  const o: Record<string, number> = {};

  Array.from(str).forEach((i) => {
    if (Object.keys(o).includes(i)) {
      o[i] += 1;
    } else {
      o[i] = 1;
    }
  });

  return o;
}

/**
 * Gets the file extension of a string. If the string doesn't have a dot delimiting a file extension, it returns `undefined`.
 *
 * @param str The string to search inside of.
 *
 * @example
 * ```ts
 * const extension = getFileExtension("some_file.hi.exe");
 * console.log(extension); // "exe"
 *
 * const extensionTwo = getFileExtension("something_else");
 * console.log(extensionTwo); // undefined
 * ```
 *
 * @returns The file extension if any.
 */
export function getFileExtension(str: string): string | undefined {
  // return str.split(".")[str.split(".").length - 1];
  if (!validate(str)) return undefined;
  const ext = str.split(".").pop();
  return ext ? ext.trim() : undefined;
}

/**
 * Makes the given string plural if the given number is greater than one. Only works with English and is not 100% accurate.
 *
 * @param str The string to pluralize (or not).
 * @param number The number to count on.
 *
 * @example
 * ```ts
 * let count = 1
 * const str = pluralOrNot("constant", count);
 * console.log(str); // "constant"
 *
 * count = count + 1;
 *
 * console.log(str); // "constants"
 * ```
 *
 * @returns The string, pluralized if required and unchanged otherwise.
 */
export function pluralOrNot(str: string, number: number): string {
  if (number === 1) return str;

  const string = str.trim();

  if (string.endsWith("y") && !/[aeiou]y$/.test(str)) {
    return `${string.slice(0, -1)}ies`; // felony -> felonies
  }

  /* if (string.endsWith("o") && /[^aeiou]o$/.test(string)) {
      return `${string}es`; // tomato -> tomatoes (may error because of things like piano -> pianos)
    } */

  if (string.endsWith("f")) {
    return `${string.slice(0, -1)}ves`; // leaf -> leaves
  }
  if (string.endsWith("fe")) {
    return `${string.slice(0, -2)}ves`; // knife -> knives
  }

  return `${string}s`; // constant -> constants
}

/**
 * Checks if all characters of a string are uppercase.
 *
 * @param str The string to check.
 *
 * @example
 * ```ts
 * let str = "HELLO CHAT"
 * const isUpper = isUpperCase(str);
 * console.log(isUpper); // true
 *
 * str = "HELLO Chat"
 *
 * const isUpperTwo = isUpperCase(str);
 * console.log(isUpperTwo); // false
 * ```
 *
 * @returns True if all characters are uppercase, false if otherwise.
 */
export function isUpperCase(str: string): boolean {
  return str.toUpperCase() === str;
}

/**
 * Checks if all characters of a string are lowercase.
 *
 * @param str The string to check.
 *
 * @example
 * ```ts
 * let str = "hello chat"
 * const isLower = isLowerCase(str);
 * console.log(isLower); // true
 *
 * str = "Hello chat"
 *
 * const isUpperTwo = isLowerCase(str);
 * console.log(isUpperTwo); // false
 * ```
 *
 * @returns True if all characters are lowercase, false if otherwise.
 */
export function isLowerCase(str: string): boolean {
  return str.toLowerCase() === str;
}

/**
 * Takes a `snake_case` string and splits it.
 *
 * @param str The string to split.
 *
 * @example
 * ```ts
 * const splitted = splitSnakeCase("some_variable");
 * console.log(splitted); // ["some", "variable"]
 * ```
 *
 * @returns A string array with all words from the string.
 */
export function splitSnakeCase(str: string): string[] {
  return str.trim().split("_");
}

/**
 * Takes a `kebab-case` string and splits it.
 *
 * @param str The string to split.
 *
 * @example
 * ```ts
 * const splitted = splitKebabCase("some-variable");
 * console.log(splitted); // ["some", "variable"]
 * ```
 *
 * @returns A string array with all words from the string.
 */
export function splitKebabCase(str: string): string[] {
  return str.trim().split("-");
}

/**
 * Takes a `camelCase` or `PascalCase` string and splits it.
 *
 * @param str The string to split.
 *
 * @example
 * ```ts
 * const splitted = splitCamelOrPascalCase("someVariable");
 * console.log(splitted); // ["some", "variable"]
 * ```
 *
 * @returns A string array with all words from the string.
 */
export function splitCamelOrPascalCase(str: string): string[] {
  return str.split(/(?=[A-Z])/).join(" ").toLowerCase().split(" ").filter((s) => validate(s));
}

/**
 * Takes a string and turns it into an URL-friendly slug.
 *
 * @param str The string to slugify.
 *
 * @example
 * ```ts
 * const slug = slugify("My Homepage!");
 * console.log(slug); // "my-homepage"
 * ```
 *
 * @returns An URL friendly version of the given string.
 */
export function slugify(str: string): string {
  return normalize(str, { removeCliColors: true }).replace(/[^\w\s-]/g, "")
    .replaceAll(" ", "-");
}

/**
 * Takes a string and masks it by replacing all characters with `*`, or a custom mask if given. You can specify a number of visible characters, being that the amount of characters shown _starting from the end of the string_.
 *
 * @param {string} str The string to mask.
 * @param {?IMaskOptions} options Options for the masker.
 *
 * @example
 * ```ts
 * const password = mask("secret!", 2);
 * console.log(password); // "******t!"
 * ```
 *
 * @returns The masked string.
 */
export function mask(str: string, options?: IMaskOptions): string {
  const { visibleChars, maskChar } = options || { visibleChars: 2, maskChar: "*" };

  const charsShown = Math.max(0, visibleChars || 0);
  if (charsShown >= str.length) return str; // directly return untouched

  const maskedPart = (maskChar || "*").repeat(str.length - charsShown);
  const visiblePart = str.slice(-charsShown); // take last charsShown characters

  return maskedPart + visiblePart;
}

/**
 * Takes an email string and masks the user address using {@linkcode mask}.
 *
 * @param {string} str The email string to mask.
 * @param {?IMaskOptions} options Options for the masker.
 *
 * @example
 * ```ts
 * const email = maskEmail("secret@proton.me");
 * console.log(email); // "****et@proton.me"
 * ```
 *
 * @returns The masked email address.
 */
export function maskEmail(str: string, options?: IMaskOptions): string {
  if (!isValidEmail(str)) return str;

  const { visibleChars, maskChar } = options || { visibleChars: 2, maskChar: "*" };

  const split = str.split("@");
  const masked = mask(split[0], { visibleChars, maskChar });
  split.shift();
  return `${masked}@${split.join("")}`;
}

/**
 * Takes a string and converts it to `snake_case`.
 *
 * @param str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toSnakeCase("my variable");
 * console.log(variable); // "my_variable"
 * ```
 *
 * @returns The converted string.
 */
export function toSnakeCase(str: string): string {
  return normalize(str).replace(/\s+/g, "_");
}

/**
 * Takes a string and converts it to `kebab-case`.
 *
 * @param str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toKebabCase("my variable");
 * console.log(variable); // "my-variable"
 * ```
 *
 * @returns The converted string.
 */
export function toKebabCase(str: string): string {
  return normalize(str).replace(/\s+/g, "-");
}

/**
 * Takes a string and converts it to `camelCase`.
 *
 * @param {string} str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toCamelCase("my variable");
 * console.log(variable); // "myVariable"
 * ```
 *
 * @returns The converted string.
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .map((word, i) => i === 0 ? word.toLowerCase() : toUpperCaseFirst(word))
    .join("");
}

/**
 * Takes a string and converts it to `PascalCase`.
 *
 * @param {string} str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toPascalCase("my variable");
 * console.log(variable); // "MyVariable"
 * ```
 *
 * @returns The converted string.
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .map((word) => toUpperCaseFirst(word))
    .join("");
}

/**
 * Takes a string and converts it to `L33T 5P34K`.
 *
 * @param {string} str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toLeetSpeak("hello world!");
 * console.log(variable); // "H3110 W0R1D!"
 * ```
 *
 * @returns The converted string.
 */
export function toLeetSpeak(str: string): string {
  return str
    .toUpperCase()
    .replaceAll("A", "4")
    .replaceAll("E", "3")
    .replaceAll("L", "1")
    .replaceAll("O", "0")
    .replaceAll("U", "V")
    .replaceAll("S", "5")
    .replaceAll("T", "7");
}

/**
 * Takes a string and converts it to `nErD CaSe`.
 *
 * @param {string} str The string to convert.
 *
 * @example
 * ```ts
 * const variable = toNerdCase("hello world!");
 * console.log(variable); // "hElLo wOrLd!"
 * ```
 *
 * @returns The converted string.
 */
export function toNerdCase(str: string): string {
  const splitted = str.split("");
  const newStr = [];

  for (let i = 0; i < splitted.length; i++) {
    newStr.push(i % 2 === 0 ? splitted[i] : splitted[i].toUpperCase());
  }

  return newStr.join("");
}

/**
 * Takes all numbers from a string and returns them as part of an array.
 *
 * @param str The string to search inside of.
 *
 * @example
 * ```ts
 * const numbers = extractNumbers("i'll have 2 number 9, a number 9 large, a number 6 with extra dip, 2 number 45, one with cheese, and a large soda");
 * console.log(numbers); // [2, 9, 9, 6, 2, 45]
 * // may i note how funny i found it that GitHub Copilot autocompleted the whole order while i was editing this?
 * // i swear it actually happened
 * ```
 *
 * @returns The numbers in the array.
 */
export function extractNumbers(str: string): number[] {
  return (str.match(/\d+/g) || []).map(Number);
}

/**
 * Validates if a given string is a valid email address.
 *
 * @param str The string to validate.
 *
 * @example
 * ```ts
 * const isValid = isValidEmail("oscar@somewhere.com");
 * console.log(isValid); // true
 * ```
 *
 * @returns True if the email is valid, false if otherwise.
 */
export function isValidEmail(str: string): boolean {
  if (!validate(str)) return false;
  const atSplit = str.split("@");
  if (atSplit.length < 2) return false;
  const dotSplit = atSplit[1].split(".");
  if (dotSplit.length < 2) return false;

  // validate special characters, because e.g. óscar@gmail.com ain't a valid email
  if (normalize(str) !== str.trim().toLowerCase()) return false;

  return true;
}

/**
 * Validates if a given string is a valid HEX code.
 *
 * @param str The string to validate.
 *
 * @example
 * ```ts
 * const isValid = isValidHexColor("#ABCDEF");
 * console.log(isValid); // true
 * ```
 *
 * @returns True if the HEX string is valid, false if otherwise.
 */
export function isValidHexColor(str: string): str is `#${string}` {
  return /^#[0-9A-F]{3}$/i.test(str) ||
    /^#[0-9A-F]{4}$/i.test(str) ||
    /^#[0-9A-F]{6}$/i.test(str) ||
    /^#[0-9A-F]{8}$/i.test(str);
  // 3, 4, 6, and 8
  // #FFF, #FFFF, #FFFFFF, and #FFFFFFFF are all valid
}

/**
 * Cleans HTML tags by turning them into ampersand-preceded codes (however you call those).
 *
 * @param str The string to clean.
 *
 * @example
 * ```ts
 * const sanitized = cleanHtml("<h1>hi</h1>");
 * console.log(sanitized); // "&lt;h1&gt;hi&lt;&#47;h1&gt;"
 * ```
 *
 * @returns Clean HTML string.
 */
export function cleanHtml(str: string): string {
  return str
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
    .replaceAll("/", "&#47;");
}

/**
 * Formats HTML tags from a string with ampersand-preceded codes (however you call those).
 *
 * @param str The string to format.
 *
 * @example
 * ```ts
 * const formatted = fmtHtml("&lt;h1&gt;");
 * console.log(formatted); // "<h1>hi</h1>"
 * ```
 *
 * @returns Formatted HTML string.
 */
export function fmtHtml(str: string): string {
  return str
    .trim()
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#47;", "/");
}

/**
 * Escapes a JavaScript code string.
 *
 * @param str The string to escape.
 *
 * @example
 * ```ts
 * const escaped = escapeJS(`console.log("hi");`);
 * console.log(escaped); // "console.log(\"hi\");"
 * ```
 *
 * @returns Escaped JS string.
 */
export function escapeJS(str: string): string {
  return str
    .trim()
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll("'", "\\'")
    // this below escapes unprintable / "invisible" chars
    .replace(
      // deno-lint-ignore no-control-regex
      /[\x00-\x1F\x7F-\x9F]/g,
      (match) => `\\u${("0000" + match.charCodeAt(0).toString(16).toUpperCase()).slice(-4)}`,
    );
}

/**
 * Gets the longest word of a string or of an array of strings.
 *
 * @param {string | string[]} str The string(s) to search inside of.
 *
 * @example
 * ```ts
 * const longest = getLongest("here are four words");
 * console.log(longest); // "words"
 * ```
 *
 * @returns The longest string found.
 */
export function getLongest(str: string | string[]): string {
  if (!validate(str.toString())) return "";
  const strArr = Array.isArray(str) ? str : str.split(" ");
  return strArr.sort((a, b) => a.length - b.length).pop()!; // ! because we know it's not empty
}

/**
 * Gets a string made of random characters and with the desired length.
 *
 * @param {number} length The length of the string.
 *
 * @example
 * ```ts
 * const random = getRandomString(7);
 * console.log(random); // 8AmKnAl
 * ```
 *
 * @returns A random string.
 */
export function getRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  )
    .join("");
}

/**
 * Gets the first n words of a string.
 *
 * @param {string} str The string to get the words from.
 * @param {number} n The amount of words to get.
 *
 * @example
 * ```ts
 * const firstFour = getFirstWords("This is a not so long sentence you know?", 4);
 * console.log(firstFour); // "This is a not"
 * ```
 *
 * @returns A random string.
 */
export function getFirstWords(str: string, n: number): string {
  return str.split(" ").slice(0, n).join(" ");
}

/**
 * Checks if a given string is a CLI flag and tests it against a target string. It returns true if the string matches the target flag.
 *
 * @param {string} str String to test.
 * @param {string} target String to test against of.
 * @param {?ITestFlagOptions} options Options for the tester.
 *
 * @example
 * ```ts
 * testFlag("hi", "hi"); // false
 * testFlag("--hi", "hi"); // true
 * ```
 *
 * @returns True if the `str` matches the `target`'s flag, false if otherwise.
 */
export function testFlag(str: string, target: string, options?: ITestFlagOptions): boolean {
  const { allowQuickFlag, allowSingleDash, allowNonExactString } = options ||
    { allowQuickFlag: false, allowSingleDash: true, normalize: true };

  const toTest = allowNonExactString ? normalize(str) : str.trim();
  const toTestAgainstOf = allowNonExactString ? normalize(target) : target.trim();

  if (!validate(toTest) || !validate(toTestAgainstOf)) return false;

  const singleDash = allowSingleDash === true || allowSingleDash === undefined;
  const quickFlag = allowQuickFlag === true;

  const targets = [
    `--${toTestAgainstOf}`,
  ];

  if (singleDash) targets.push(`-${toTestAgainstOf}`);
  if (quickFlag) targets.push(`--${toTestAgainstOf.charAt(0)}`);
  if (quickFlag && singleDash) targets.push(`-${toTestAgainstOf.charAt(0)}`);

  return targets.includes(toTest);
}

/**
 * Checks if a given string array includes a CLI flag that matches a target string. It returns true if _any_ of the strings matches the target flag.
 *
 * @param {string[]} strArr Strings to test.
 * @param {string} target String to test against of.
 * @param {?ITestFlagOptions} options Options for the tester.
 *
 * @example
 * ```ts
 * testFlags(["--hi", "--hello", "whatever"], "hi"); // true
 * testFlags(["--hi", "whatever"], "hello"); // false
 * ```
 *
 * @returns True if the `str` matches the `target`'s flag, false if otherwise.
 */
export function testFlags(strArr: string[], target: string, options?: ITestFlagOptions): boolean {
  return strArr.some((s) => testFlag(s, target, options));
}

/**
 * It takes a Record where each key is a search string and each value is the string to replace with, and replaces all occurrences of each key with the designated value in a given string.
 *
 * @param {string} str String to replace.
 * @param {Record<string, string>} replacements Strings to replace with.
 *
 * @example
 * ```ts
 * replace(
 *     "hi! my name is [[name]]",
 *     {
 *         "[[name]]": "Zaka"
 *     }
 * ); // "hi! my name is Zaka"
 * ```
 *
 * @returns {string} The replaced string.
 */
export function replace(str: string, replacements: Record<string, string>): string {
  let workingStr = str;

  for (const k of Object.keys(replacements)) {
    workingStr = workingStr.replaceAll(k.trim(), replacements[k]);
  }

  return workingStr;
}

/**
 * Gets a chunk of a string an returns it.
 *
 * @param {string} str String to divide.
 * @param {number} start Character where the chunk starts.
 * @param {number} end Character where the chunk ends.
 *
 * @example
 * ```ts
 * chunk("abcdef", 3, 5); // "cde"
 * ```
 *
 * @returns {string[]} The desired chunk of the string.
 */
export function chunk(str: string, start: number, end: number): string {
  return Array.from(str).slice(start, end).join("");
}

/**
 * Divides a string into several chunks of the desired length and returns them into an array.
 *
 * If a chunk happened to be an invalid string (e.g. `"   "`) it won't be present in the final array, because of our string validation.
 *
 * @param {string} str String to divide.
 * @param {number} length Length of each chunk.
 *
 * @example
 * ```ts
 * chunks("abcdef", 3); // ["abc", "def"]
 * ```
 *
 * @returns {string[]} An array of chunks.
 */
export function chunks(str: string, length: number): string[] {
  if (length <= 0) return [str];

  const arr = Array.from(str);

  const arrays = [];
  const len = arr.length;
  let i = 0;

  while (i <= len) {
    arrays.push(arr.splice(0, length));
    i += length;
  }

  return arrays.map((i) => i.join("")).flat().filter(validate);
}

/**
 * Checks the similarity of two strings and returns a number between 0 and 1 (0 = totally different, 1 = exactly the same).
 *
 * Note: Current implementation is a bit basic and should be improved in further versions of StringUtils.
 *
 * @param {string} strA String to compare against of.
 * @param {string} strB String to be tested.
 * @returns {number} Similarity from 0 to 1.
 */
export function similarity(strA: string, strB: string): number {
  const arrA = Array.from(strA);
  const arrB = Array.from(strB);
  let i = 0;
  let s = 0;

  for (const m of arrA) {
    if (!arrB.at(i)) {
      i++;
      continue;
    }
    if (m === arrB.at(i)) s += 1;
    else if (m.toLowerCase() === arrB.at(i)!.toLowerCase()) s += 0.25;
    else if (normalize(m, { strict: true }) === normalize(arrB.at(i)!, { strict: true })) s += 0.25;
    i++;
    continue;
  }

  return s / arrA.length;
}
