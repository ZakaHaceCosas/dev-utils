import { assertEquals } from "@std/assert";
import * as NumberUtils from "./mod.ts";

function assertKindaEquals(actual: number, expected: unknown, threshold?: number): void {
  assertEquals(NumberUtils.roundTo(actual, threshold ?? 1), expected);
}

Deno.test({
  name: "degreesToRadians works",
  fn: () => {
    assertEquals(NumberUtils.degreesToRadians(180), Math.PI);
    assertEquals(NumberUtils.degreesToRadians(360), Math.PI * 2);
    assertEquals(NumberUtils.degreesToRadians(90), Math.PI / 2);
  },
});

Deno.test({
  name: "radiansToDegrees works",
  fn: () => {
    assertEquals(NumberUtils.radiansToDegrees(Math.PI), 180);
    assertEquals(NumberUtils.radiansToDegrees(Math.PI * 2), 360);
    assertEquals(NumberUtils.radiansToDegrees(Math.PI / 2), 90);
  },
});

Deno.test({
  name: "kilometersToMiles works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(NumberUtils.kilometersToMiles(5), 6),
      3.106855,
    );
  },
});

Deno.test({
  name: "milesToKilometers works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(NumberUtils.milesToKilometers(5), 6),
      8.046722,
    );
  },
});

Deno.test({
  name: "metersToFeet works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(NumberUtils.metersToFeet(5), 6),
      16.4042,
    );
  },
});

Deno.test({
  name: "feetToMeters works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(NumberUtils.feetToMeters(5), 6),
      1.524,
    );
  },
});

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
  name: "random works",
  fn: () => {
    // cant think of a better way to test randomness lol
    assertEquals(NumberUtils.random(1, 69) <= 69, true);
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
    assertEquals(NumberUtils.sumArray([60, 5, 3, 0.5, 0.25, 0.75, -0.5]), 69);
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

Deno.test({
  name: "centimetersToInches works",
  fn: () => {
    assertKindaEquals(
      NumberUtils.centimetersToInches(10),
      3.94,
      2,
    );
  },
});

Deno.test({
  name: "inchesToCentimeters works",
  fn: () => {
    assertKindaEquals(NumberUtils.inchesToCentimeters(10), 25.4, 2);
  },
});

Deno.test({
  name: "celsiusToFahrenheit works",
  fn: () => {
    assertEquals(
      NumberUtils.celsiusToFahrenheit(25),
      77,
    );
  },
});

Deno.test({
  name: "fahrenheitToCelsius works",
  fn: () => {
    assertEquals(
      NumberUtils.fahrenheitToCelsius(105),
      40.55555555555556,
    );
  },
});

Deno.test({
  name: "kilometersPerHourToMilesPerHour works",
  fn: () => {
    assertEquals(
      NumberUtils.kilometersPerHourToMilesPerHour(2),
      1.242742384474668,
    );
  },
});

Deno.test({
  name: "milesPerHourToKilometersPerHour works",
  fn: () => {
    assertEquals(
      NumberUtils.milesPerHourToKilometersPerHour(2),
      3.218688,
    );
  },
});

Deno.test({
  name: "combinations works",
  fn: () => {
    assertEquals(NumberUtils.combinations(5, 2), 10);
    assertEquals(NumberUtils.combinations(5, 5), 1);
    assertEquals(NumberUtils.combinations(5, 0), 0);
    assertEquals(NumberUtils.combinations(5, 6), 0);
    assertEquals(NumberUtils.combinations(5, -1), 0);
  },
});

Deno.test({
  name: "permutations works",
  fn: () => {
    assertEquals(NumberUtils.permutations(5), 120);
    assertEquals(NumberUtils.permutations(0), 0);
    assertEquals(NumberUtils.permutations(-1), 0);
  },
});

Deno.test({
  name: "variations works",
  fn: () => {
    assertEquals(NumberUtils.variations(5, 3), 60);
    assertEquals(NumberUtils.variations(5, -1), 0);
    assertEquals(NumberUtils.variations(5, 0), 0);
    assertEquals(NumberUtils.variations(-1, 5), 0);
    assertEquals(NumberUtils.variations(-1, 0), 0);
    assertEquals(NumberUtils.variations(-1, -1), 0);
  },
});

Deno.test({
  name: "permutationsR works",
  fn: () => {
    assertEquals(NumberUtils.permutationsR(5, [2, 1, 1, 1]), 60);
    assertEquals(NumberUtils.permutationsR(5, [2, 3]), 10);
    assertEquals(NumberUtils.permutationsR(5, [2, 3, 2]), 0);
    assertEquals(NumberUtils.permutationsR(5, [0]), 0);
    assertEquals(NumberUtils.permutationsR(0, [5]), 0);
  },
});

Deno.test({
  name: "variationsR works",
  fn: () => {
    assertEquals(NumberUtils.variationsR(5, 3), 125);
    assertEquals(NumberUtils.variationsR(5, 0), 0);
    assertEquals(NumberUtils.variationsR(5, -1), 0);
    assertEquals(NumberUtils.variationsR(-1, 5), 0);
    assertEquals(NumberUtils.variationsR(-1, -5), 0);
    assertEquals(NumberUtils.variationsR(-1, 0), 0);
  },
});
