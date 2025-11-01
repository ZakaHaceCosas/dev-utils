import process from "node:process";

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
