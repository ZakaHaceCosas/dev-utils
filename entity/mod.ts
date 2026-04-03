// deno-lint-ignore-file no-explicit-any
/**
 * A set of utilities for working with arrays and objects. Serving 9 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @module
 */

// * SECTION: TYPES * //

/**
 * Either an array with items of type `T` or an object with values of type `T` (and keys of type `string | number`, which is the sane thing to expect).
 */
export type ArrayOrObject<T> = T[] | Record<string | number, T>;

// * SECTION: MODULE * //

/**
 * Type guard that checks if the given value is an array or an object, telling you which.
 *
 * It's a bit tricky, as it returns a boolean where `false` doesn't mean 'invalid' but 'it is an object' instead (and `true` means 'it is an array'). This will work correctly with items typed as `ArrayOrObject`.
 *
 * If it's neither an array nor an object, it throws.
 *
 * @param {*} whatever Whatever you want to check.
 * @returns {boolean} `true` for arrays and `false` for objects.
 * @throws {TypeError} If it's neither.
 */
export function validArrayOrObject<T>(whatever: any): whatever is Array<T> {
  if (typeof whatever !== "object") throw new TypeError(`${whatever} is neither an array nor an object.`);
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

/**
 * Checks if every item in the array or key in the object are equal. For objects that includes nested keys (as in `{ a: { a: { a: "b" } } }`), otherwise it wouldn't make much sense.
 *
 * @param aoo What to check inside of.
 *
 * @example
 * ```ts
 * allEqualK(["A", "A", "A"]); // true
 * allEqualK(["A", "A", "B"]); // false
 * allEqualK({ a: { a: "b" } }); // true
 * allEqualK({ a: { b: "b" } }); // false
 * ```
 *
 * @returns {boolean} True if everything is equal, false if otherwise.
 */
export function allEqualK<T>(aoo: ArrayOrObject<T>): boolean {
  if (validArrayOrObject(aoo)) {
    const zero = aoo[0];
    return aoo.every((i) => i == zero);
  }
  const vals = Object.entries(aoo);
  const zero = vals[0][0];
  const boolArr: boolean[] = [];
  const callback = (v: [string | number, any]) => {
    if (typeof v[1] == "object" && !validArrayOrObject(v[1])) {
      Object.entries(v[1]).forEach((w) => callback(w));
    } else {
      boolArr.push(v[0] == zero);
    }
  };
  return boolArr.every((v) => v == true);
}
