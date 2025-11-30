// deno-lint-ignore-file no-explicit-any
/**
 * A set of utilities for working with arrays and objects. Serving 9 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @module
 */

// * SECTION: TYPES * //

export type ArrayOrObject<T> = T[] | Record<any, T>;

// * SECTION: MODULE * //

/**
 * Type guard that checks if the given value is an array or an object, telling you which.
 *
 * It's a bit tricky, as it returns a boolean where `false` doesn't mean 'invalid' but 'it is an object' instead (and `true` means 'it is an array'). If it's neither an array nor an object, it throws.
 *
 * @param {*} whatever Whatever you want to check.
 * @returns {boolean} `true` for arrays and `false` for objects.
 */
export function validArrayOrObject<T>(whatever: any): whatever is Array<T> {
  if (typeof whatever !== "object") throw `${whatever} is neither an array nor an object.`;
  return Array.isArray(whatever);
}

/**
 * Shuffles an array or the values of an object, returning a random item.
 * @param {ArrayOrObject<T>} aoo - What to shuffle.
 *
 * @example
 * ```ts
 * shuffle(["A", "B", "C", "D", "E"]); // returns whatever, e.g. "B"
 * shuffle({ a: "b", c: "d" }); // returns either "b" or "d"
 * ```
 *
 * @returns {T} A value from the object or array.
 */
export function shuffle<T>(aoo: ArrayOrObject<T>): T {
  if (validArrayOrObject(aoo)) return aoo[Math.floor(Math.random() * aoo.length)]!;
  const vals = Object.values(aoo);
  return vals[Math.floor(Math.random() * vals.length)]!;
}

/**
 * Shuffles an array or the keys of an object, returning a random item.
 * @param {ArrayOrObject<T>} aoo - What to shuffle.
 *
 * @example
 * ```ts
 * shuffle(["A", "B", "C", "D", "E"]); // returns whatever, e.g. "B"
 * shuffle({ a: "b", c: "d" }); // returns either "a" or "c"
 * ```
 *
 * @returns {any} A value from the array or an object key (reason for return type being `any` instead of `T`).
 */
export function shuffleK<T>(aoo: ArrayOrObject<T>): any {
  if (validArrayOrObject(aoo)) return aoo[Math.floor(Math.random() * aoo.length)]!;
  const vals = Object.keys(aoo);
  return vals[Math.floor(Math.random() * vals.length)]!;
}
