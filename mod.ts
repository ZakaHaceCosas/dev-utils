/**
 * Variable that's _possibly_ a string.
 *
 * @export
 */
export type UnknownString = undefined | null | string | "";

/**
 * A set of utilities for interacting with strings.
 * @author ZakaHaceCosas
 */
export const StringUtils: {
  /**
   * Capitalizes the first letter of the string.
   * @param str The string to modify.
   * @returns The string with the first letter capitalized.
   */
  toUpperCaseFirst(str: string): string;
  /**
   * Lowercases the first letter of the string.
   * @param str The string to modify.
   * @returns The string with the first letter in lowercase.
   */
  toLowerCaseFirst(str: string): string;
  /**
   * Capitalizes the first letter of each word in the string.
   * @param str The string to modify.
   * @returns The string with each word capitalized.
   */
  capitalizeWords(str: string): string;
  /**
   * Capitalizes the first letter of each word except small words.
   * @param str The string to modify.
   * @returns The string with title-case formatting.
   */
  toTitleCase(str: string): string;
  /**
   * Reverses the characters of a string.
   * @param str The string to reverse.
   * @returns The reversed string.
   */
  reverseString(str: string): string;
  /**
   * Removes all whitespace from the string.
   * @param str The string to modify.
   * @returns The string without any whitespace.
   */
  removeWhitespace(str: string): string;
  /**
   * Truncates a string to a specified length and appends "..." if needed.
   * @param str The string to truncate.
   * @param length The length to truncate to.
   * @returns The truncated string.
   */
  truncate(str: string, length: number): string;
  /**
   * Takes an argument that's _possibly_ a string and validates it.
   * @param str The string to test.
   *
   * @example
   * ```ts
   * const argument: UnknownString = Deno.args[1]; // Deno.args[1] is maybe not defined, or maybe an empty string which you might don't want
   * if (!StringUtils.validate(argument)) {
   *    throw new Error("No argument given!");
   * }
   * console.log("Arg:", secondCliArgument); // here we know it's not null, not undefined, and not "" (or "     ")
   * ```
   *
   * @returns True if it's valid and false if otherwise.
   */
  validate(str: UnknownString): str is string;
} = {
  toUpperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  toLowerCaseFirst(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  },

  capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  },

  toTitleCase(str: string): string {
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
  },

  reverseString(str: string): string {
    return str.split("").reverse().join("");
  },

  removeWhitespace(str: string): string {
    return str.replace(/\s+/g, "");
  },

  truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  },

  validate(str: UnknownString): str is string {
    if (
      str === undefined || str === null || typeof str !== "string" ||
      str.trim() === ""
    ) {
      return false;
    }

    return true;
  },
};
