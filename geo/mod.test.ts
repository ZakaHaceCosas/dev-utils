import { GeoUtils } from "./mod.ts";
import { NumberUtils } from "../number/mod.ts";
import { assertEquals } from "@std/assert";

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
    assertEquals(
      NumberUtils.roundTo(GeoUtils.kilometersToMiles(5), 6),
      3.106855,
    );
  },
});

Deno.test({
  name: "milesToKilometers works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(GeoUtils.milesToKilometers(5), 6),
      8.046722,
    );
  },
});

Deno.test({
  name: "haversineDistance works",
  fn: () => {
    assertEquals(
      NumberUtils.roundTo(GeoUtils.haversineDistance({ lat: 0, lon: 0 }, { lat: 5, lon: 5 }), 1),
      785.8,
    );
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
