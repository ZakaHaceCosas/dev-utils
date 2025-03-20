import { NumberUtils } from "../number/mod.ts";
import { assertEquals } from "@std/assert";

Deno.test({
  name: "isEven works",
  fn: () => {
    assertEquals(NumberUtils.isEven(2), true);
    assertEquals(NumberUtils.isEven(3), false);
    assertEquals(NumberUtils.isEven(-2), true);
    assertEquals(NumberUtils.isEven(-3), false);
  },
});
Deno.test({
  name: "isOdd works",
  fn: () => {
    assertEquals(NumberUtils.isOdd(2), false);
    assertEquals(NumberUtils.isOdd(3), true);
    assertEquals(NumberUtils.isOdd(-2), false);
    assertEquals(NumberUtils.isOdd(-3), true);
  },
});
Deno.test({
  name: "roundTo works",
  fn: () => {
    assertEquals(NumberUtils.roundTo(69.69), 70);
    assertEquals(NumberUtils.roundTo(69.69, 1), 69.7);
  },
});
Deno.test({
  name: "randomInt works",
  fn: () => {
    // cant think of a better way to test randomness lol
    assertEquals(NumberUtils.randomInt(1, 69) < 69, true);
  },
});
Deno.test({
  name: "isPrime works",
  fn: () => {
    assertEquals(NumberUtils.isPrime(7), true);
    assertEquals(NumberUtils.isPrime(8), false);
  },
});
Deno.test({
  name: "sum works",
  fn: () => {
    assertEquals(NumberUtils.sum([60, 5, 3, 0.5, 0.25, 0.75, -0.5]), 69);
  },
});
Deno.test({
  name: "average works",
  fn: () => {
    assertEquals(NumberUtils.average([4.99, 5.01]), 5);
  },
});

Deno.test({
  name: "isBetween works",
  fn: () => {
    assertEquals(NumberUtils.isBetween(5, 4, 6), true);
    assertEquals(NumberUtils.isBetween(6.1, 4, 6), false);
  },
});
