/**
 * A few functions to measure how much did your project actually improve in performance.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @module
 */

// * SECTION: MODULE * //

/**
 * Returns by how much percentage you've reduced the time it takes to run a task, in the sense of "*made foobar take 90% less time*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 * @returns {string} Improvement.
 */
export function reduction(oldMs: number, newMs: number): string {
  return (((oldMs - newMs) / oldMs) * 100).toPrecision(4);
}

/**
 * Returns by how much percentage you've improved the speed of the task, in the sense of "*made foobar 80% faster*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 * @returns {string} Increase.
 */
export function performance(oldMs: number, newMs: number): string {
  return (((oldMs - newMs) / newMs) * 100).toPrecision(4);
}

/**
 * Returns how much faster you've made the task, in the sense of "*made foobar 20 times faster*".
 *
 * @param {number} oldMs Time (in ms) of the old operation.
 * @param {number} newMs Time (in ms) of the new operation.
 * @returns {string} Times faster.
 */
export function times(oldMs: number, newMs: number): string {
  return (oldMs / newMs).toPrecision(4);
}
