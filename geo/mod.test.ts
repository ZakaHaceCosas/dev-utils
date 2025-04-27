import { GeoUtils } from "./mod.ts";
import { NumberUtils } from "../number/mod.ts";
import { assertEquals } from "@std/assert";

function assertKindaEquals(actual: number, expected: unknown, threshold?: number): void {
  assertEquals(NumberUtils.roundTo(actual, threshold ?? 1), expected);
}

Deno.test({
  name: "degreesToRadians works",
  fn: () => {
    assertEquals(GeoUtils.degreesToRadians(180), Math.PI);
    assertEquals(GeoUtils.degreesToRadians(360), Math.PI * 2);
    assertEquals(GeoUtils.degreesToRadians(90), Math.PI / 2);
  },
});

Deno.test({
  name: "radiansToDegrees works",
  fn: () => {
    assertEquals(GeoUtils.radiansToDegrees(Math.PI), 180);
    assertEquals(GeoUtils.radiansToDegrees(Math.PI * 2), 360);
    assertEquals(GeoUtils.radiansToDegrees(Math.PI / 2), 90);
  },
});

Deno.test({
  name: "kilometersToMiles works",
  fn: () => {
    assertKindaEquals(
      GeoUtils.kilometersToMiles(5),
      3.106855,
      6,
    );
  },
});

Deno.test({
  name: "milesToKilometers works",
  fn: () => {
    assertKindaEquals(
      GeoUtils.milesToKilometers(5),
      8.046722,
      6,
    );
  },
});

Deno.test({
  name: "metersToFeet works",
  fn: () => {
    assertKindaEquals(GeoUtils.metersToFeet(5), 16.4042, 6);
  },
});

Deno.test({
  name: "feetToMeters works",
  fn: () => {
    assertKindaEquals(GeoUtils.feetToMeters(5), 1.524, 6);
  },
});

Deno.test({
  name: "haversineDistance works",
  fn: () => {
    assertKindaEquals(GeoUtils.haversineDistance({ lat: 0, lon: 0 }, { lat: 5, lon: 5 }), 785.8);
  },
});

Deno.test({
  name: "degreesToDMS works",
  fn: () => {
    assertEquals(
      GeoUtils.degreesToDMS(65.50),
      { degrees: 65, minutes: 30, seconds: 0 },
    );
  },
});

Deno.test({
  name: "DMSToDegrees works",
  fn: () => {
    assertEquals(
      GeoUtils.DMSToDegrees({ degrees: 65, minutes: 30, seconds: 18 }),
      65.505,
    );
  },
});

Deno.test({
  name: "isValidLat works",
  fn: () => {
    assertEquals(
      GeoUtils.isValidLat(99),
      false,
    );
    assertEquals(
      GeoUtils.isValidLat(90),
      true,
    );
    assertEquals(
      GeoUtils.isValidLat(89),
      true,
    );
  },
});

Deno.test({
  name: "isValidLon works",
  fn: () => {
    assertEquals(
      GeoUtils.isValidLon(199),
      false,
    );
    assertEquals(
      GeoUtils.isValidLon(170),
      true,
    );
    assertEquals(
      GeoUtils.isValidLon(89),
      true,
    );
  },
});

Deno.test({
  name: "isClose works",
  fn: () => {
    assertEquals(
      GeoUtils.isClose(
        { lat: 5, lon: 5 },
        { lat: 10, lon: 10 },
        800,
      ),
      true,
    );
    assertEquals(
      GeoUtils.isClose(
        { lat: 5, lon: 5 },
        { lat: 10, lon: 10 },
        500,
      ),
      false,
    );
  },
});
