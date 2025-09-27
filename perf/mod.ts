/**
 * A few functions to measure how much did your project actually improve in performance.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @module
 */

// * SECTION: MODULE * //

/**
 * Returns by how much percentage you've reduced the time it takes to run a task.
 *
 * Works in the sense of "*made foobar take 90% less time*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 *
 * @example
 * ```ts
 * reduction(1000, 500); // returns "50.00"
 * // 1000ms -> 500ms = takes 50% less time
 * ```
 *
 * @returns {number} Reduction (percentage). Floating point number.
 */
export function reduction(oldMs: number, newMs: number): number {
  return (((oldMs - newMs) / oldMs) * 100);
}

/**
 * Returns by how much percentage you've improved the speed of the task.
 *
 * Works in the sense of "*made foobar 80% faster*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 *
 * @example
 * ```ts
 * reduction(1000, 250); // returns "300.00"
 * // 1000ms -> 250ms = is 300% faster
 * ```
 *
 * @returns {number} Speed increase (percentage). Floating point number.
 */
export function speedup(oldMs: number, newMs: number): number {
  return (((oldMs - newMs) / newMs) * 100);
}

/**
 * Returns how much faster you've made the task.
 *
 * Works in the sense of "*made foobar 20 times faster*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 *
 * @example
 * ```ts
 * timesFaster(1000, 250); // returns "4"
 * // 1000ms -> 250ms = is 4 times faster
 * ```
 *
 * @returns {number} Times faster. Floating point number.
 */
export function timesFaster(oldMs: number, newMs: number): number {
  return (oldMs / newMs);
}
