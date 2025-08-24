/**
 * A set of utilities for interacting with vectors and distances. Serving 12 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @example
 * ```ts
 * import { haversineDistance, type IPoint } from "@zakahacecosas/geo-utils";
 *
 * const pointA: IPoint = { lat: 0, lon: 0 };
 * const pointB: IPoint = { lat: 5, lon: 5 };
 *
 * console.log(haversineDistance(pointA, pointB));
 * ```
 *
 * @example
 * ```ts
 * import { milesToKilometers } from "@zakahacecosas/geo-utils";
 *
 * const distance = getHouseDistanceMiles(user); // example
 *
 * console.log(`Your house is at ${milesToKilometers(distance)} kilometers from here!`);
 * ```
 *
 * @module
 */

// deno-lint-ignore-file no-explicit-any

// * SECTION: CONSTANTS * //

/** Earth radius in kilometers. This is the average of the equatorial and polar radius. */
const EARTH_RADIUS_KILOMETERS = 6371;

// * SECTION: TYPES * //

/**
 * A DMS (Degrees, Minutes, and Seconds) object.
 *
 * @interface IDegMinSec
 */
export interface IDegMinSec {
  /**
   * Degrees.
   *
   * @type {number}
   */
  degrees: number;
  /**
   * Minutes.
   *
   * @type {number}
   */
  minutes: number;
  /**
   * Seconds.
   *
   * @type {number}
   */
  seconds: number;
}

/**
 * A vectorial point, with a latitude and a longitude.
 *
 * In a cartesian coordinates graph, longitude equals the _x_ axis and latitude the _y_ axis.
 *
 * @interface IPoint
 */
export interface IPoint {
  /**
   * Longitude of the point in degrees. Also known as its position on the _x_ axis in a cartesian system.
   *
   * @type {number}
   */
  lon: number;
  /**
   * Latitude of the point in degrees. Also known as its position on the _y_ axis in a cartesian system.
   *
   * @type {number}
   */
  lat: number;
}

// * SECTION: MODULE * //

// * MODULE: REUSED * //

// geo-utils, number-utils

/**
 * Converts degrees to radians.
 *
 * @param {number} deg Degrees.
 *
 * @example
 * ```ts
 * degreesToRadians(180); // 3.141592653589793
 * ```
 *
 * @returns {number} Radians.
 */
export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

// geo-utils, number-utils

/**
 * Converts radians to degrees.
 *
 * @param {number} rad Radians.
 *
 * @example
 * ```ts
 * radiansToDegrees(Math.PI); // 180
 * ```
 *
 * @returns {number} Degrees.
 */
export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

// geo-utils, number-utils

/**
 * Converts kilometers to miles.
 *
 * @param {number} km Kilometers.
 *
 * @example
 * ```ts
 * kilometersToMiles(5); // 3.106855
 * ```
 *
 * @returns {number} Miles.
 */
export function kilometersToMiles(km: number): number {
  return km * 0.621371;
}

// geo-utils, number-utils

/**
 * Converts miles to kilometers.
 *
 * @param {number} miles Miles.
 *
 * @example
 * ```ts
 * milesToKilometers(5); // 8.046722
 * ```
 *
 * @returns {number} Degrees.
 */
export function milesToKilometers(miles: number): number {
  return miles / 0.621371;
}

// geo-utils, number-utils

/**
 * Converts meters to feet.
 *
 * @param {number} meters Meters.
 *
 * @example
 * ```ts
 * metersToFeet(5); // 16.4042
 * ```
 *
 * @returns {number} Feet.
 */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

// geo-utils, number-utils

/**
 * Converts feet to meters.
 *
 * @param {number} feet Feet.
 *
 * @example
 * ```ts
 * feetToMeters(5); // 1.524
 * ```
 *
 * @returns {number} Meters.
 */
export function feetToMeters(feet: number): number {
  return feet / 3.28084;
}

// * MODULE: OWN * //

/**
 * Calculates the distance between two points using the Haversine formula, returns distance in kilometers.
 *
 * @param {IPoint} from Starting point.
 * @param {IPoint} to Ending point.
 *
 * @example
 * ```ts
 * const pointA: IPoint = { lat: 0, lon: 0 };
 * const pointB: IPoint = { lat: 5, lon: 5 };
 *
 * console.log(
 *  haversineDistance(pointA, pointB);
 * );
 * ```
 *
 * @returns {number} Distance between the two points in kilometers.
 */
export function haversineDistance(from: IPoint, to: IPoint): number {
  const { lat: lat1, lon: lon1 } = from;
  const { lat: lat2, lon: lon2 } = to;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KILOMETERS * c; // Distance in km
  return distance;
}

/**
 * Converts decimal degrees to a DMS (Degrees, Minutes, and Seconds) object.
 *
 * @param {number} degrees Degrees.
 *
 * @example
 * ```ts
 * const DMS = degreesToDMS(45.45);
 *
 * const { minutes } = DMS; // 27
 * ```
 *
 * @returns {IDegMinSec} DMS object.
 */
export function degreesToDMS(degrees: number): IDegMinSec {
  const deg = Math.floor(degrees);
  const min = Math.floor((degrees - deg) * 60);
  const sec = parseFloat(((degrees - deg - min / 60) * 3600).toFixed(2));
  return { degrees: deg, minutes: min, seconds: sec };
}

/**
 * Converts a DMS (Degrees, Minutes, and Seconds) object to decimal degrees.
 *
 * @param {IDegMinSec} dms DMS object.
 *
 * @example
 * ```ts
 * DMSToDegrees({ degrees: 71, minutes: 33, seconds: 36 }); // 71.56
 * ```
 *
 * @returns {number} Decimal degrees.
 */
export function DMSToDegrees(dms: IDegMinSec): number {
  const { degrees, minutes, seconds } = dms;
  return degrees + minutes / 60 + seconds / 3600;
}

/**
 * Checks if a given value is a valid latitude.
 *
 * @param {any} lat Latitude to check.
 *
 * @example
 * ```ts
 * isValidLat(-89); // true
 * isValidLat(93); // false
 * ```
 *
 * @returns {boolean} True if it is valid, false if not.
 */
export function isValidLat(lat: any): boolean {
  return !isNaN(lat) && lat >= -90 && lat <= 90;
}

/**
 * Checks if a given value is a valid longitude.
 *
 * @param {any} lon Longitude to check.
 *
 * @example
 * ```ts
 * isValidLon(-99); // true
 * isValidLon(199); // false
 * ```
 *
 * @returns {boolean} True if it is valid, false if not.
 */
export function isValidLon(lon: any): boolean {
  return !isNaN(lon) && lon >= -180 && lon <= 180;
}

/**
 * Checks if two points are close enough, within a threshold distance. Distance is calculated using the {@linkcode haversineDistance} method.
 *
 * @param {IPoint} pointA First point.
 * @param {IPoint} pointB Second point.
 * @param {number} threshold Distance threshold.
 *
 * @example
 * ```ts
 * isClose({lat: 5, lon: 5}, {lat: 10, lon: 10}, 500); // false
 * ```
 *
 * @returns {boolean} Returns true if the distance is equal or lower to the threshold, false if otherwise.
 */
export function isClose(pointA: IPoint, pointB: IPoint, threshold: number): boolean {
  return haversineDistance(pointA, pointB) <= threshold;
}
