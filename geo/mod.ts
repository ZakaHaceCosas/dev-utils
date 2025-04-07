/**
 * A set of utilities for interacting with vectors and distances. Serving 7 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * _Note: Avoid using it as `const { fn } = GeoUtils`, it can cause issues._
 *
 * @example
 * ```ts
 * import { GeoUtils, type IPoint } from "@zakahacecosas/geo-utils";
 *
 * const pointA: IPoint = { lat: 0, lon: 0 };
 * const pointB: IPoint = { lat: 5, lon: 5 };
 *
 * console.log(
 *  GeoUtils.haversineDistance(pointA, pointB);
 * );
 * ```
 *
 * @example
 * ```ts
 * import { GeoUtils } from "@zakahacecosas/geo-utils";
 *
 * const distance = getHouseDistanceMiles(user); // example
 *
 * console.log(`Your house is at ${GeoUtils.milesToKilometers(distance)} kilometers from here!`);
 * ```
 *
 * @module
 */

// * SECTION: CONSTANTS * //

/** Earth radius in kilometers. This is the average of the equatorial and polar radius. */
const EARTH_RADIUS_KILOMETERS = 6371;

// * SECTION: TYPES * //

/**
 * A DMS (Degrees, Minutes, and Seconds) object.
 *
 * @interface IDegMinSec
 */
interface IDegMinSec {
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
interface IPoint {
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

/**
 * A set of utilities for interacting with vectors, distances, and angles. Serving 7 functions.
 *
 * _Note: Avoid using it as `const { fn } = GeoUtils`, it can cause issues._
 *
 * @version 1.1.0
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 */
export const GeoUtils: {
  // * SECTION: MODULE_DEF * //
  /**
   * Converts degrees to radians.
   *
   * @param {number} deg Degrees.
   *
   * @example
   * ```ts
   * console.log(GeoUtils.degreesToRadians(180)); // 3.141592653589793
   * ```
   *
   * @returns {number} Radians.
   */
  degreesToRadians(deg: number): number;
  /**
   * Converts radians to degrees.
   *
   * @param {number} rad Radians.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.radiansToDegrees(Math.PI)); // 180
   * ```
   *
   * @returns {number} Degrees.
   */
  radiansToDegrees(rad: number): number;
  /**
   * Converts kilometers to miles.
   *
   * @param {number} km Kilometers.
   *
   * @example
   * ```ts
   * console.log(GeoUtils.kilometersToMiles(5)); // 3.106855
   * ```
   *
   * @returns {number} Miles.
   */
  kilometersToMiles(km: number): number;
  /**
   * Converts miles to kilometers.
   *
   * @param {number} miles Miles.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.milesToKilometers(5)); // 8.046722
   * ```
   *
   * @returns {number} Degrees.
   */
  milesToKilometers(miles: number): number;
  /**
   * Converts meters to feet.
   *
   * @param {number} meters Meters.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.metersToFeet(5)); // 16.4042
   * ```
   *
   * @returns {number} Feet.
   */
  metersToFeet(meters: number): number;
  /**
   * Converts feet to meters.
   *
   * @param {number} feet Feet.
   *
   * @example
   * ```ts
   * console.log(NumberUtils.feetToMeters(5)); // 1.524
   * ```
   *
   * @returns {number} Meters.
   */
  feetToMeters(feet: number): number;
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
   *  GeoUtils.haversineDistance(pointA, pointB);
   * );
   * ```
   *
   * @returns {number} Distance between the two points in kilometers.
   */
  haversineDistance(from: IPoint, to: IPoint): number;
  /**
   * Converts decimal degrees to a DMS (Degrees, Minutes, and Seconds) object.
   *
   * @param {number} degrees Degrees.
   *
   * @example
   * ```ts
   * const DMS = GeoUtils.degreesToDMS(45.45);
   *
   * console.log(DMS.minutes); // 27
   * ```
   *
   * @returns {IDegMinSec} DMS object.
   */
  degreesToDMS(degrees: number): IDegMinSec;
  /**
   * Converts a DMS (Degrees, Minutes, and Seconds) object to decimal degrees.
   *
   * @param {IDegMinSec} dms DMS object.
   *
   * @example
   * ```ts
   * const degrees = GeoUtils.DMSToDegrees({ degrees: 71, minutes: 33, seconds: 36 });
   *
   * console.log(degrees); // 71.56
   * ```
   *
   * @returns {number} Decimal degrees.
   */
  DMSToDegrees(dms: IDegMinSec): number;
} = {
  // * SECTION: MODULE_ITSELF * //

  // * MODULE: REUSED * //

  // geo-utils, number-utils
  degreesToRadians(deg: number): number {
    return (deg * Math.PI) / 180;
  },

  // geo-utils, number-utils
  radiansToDegrees(rad: number): number {
    return (rad * 180) / Math.PI;
  },

  // geo-utils, number-utils
  kilometersToMiles(km: number) {
    return km * 0.621371;
  },

  // geo-utils, number-utils
  milesToKilometers(miles: number) {
    return miles / 0.621371;
  },

  // geo-utils, number-utils
  metersToFeet(meters: number) {
    return meters * 3.28084;
  },

  // geo-utils, number-utils
  feetToMeters(feet: number) {
    return feet / 3.28084;
  },

  // * MODULE: OWN * //

  haversineDistance(from: IPoint, to: IPoint) {
    const { lat: lat1, lon: lon1 } = from;
    const { lat: lat2, lon: lon2 } = to;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) * Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS_KILOMETERS * c; // Distance in km
    return distance;
  },

  degreesToDMS(degrees: number): IDegMinSec {
    const deg = Math.floor(degrees);
    const min = Math.floor((degrees - deg) * 60);
    const sec = parseFloat(((degrees - deg - min / 60) * 3600).toFixed(2));
    return { degrees: deg, minutes: min, seconds: sec };
  },

  DMSToDegrees(dms: IDegMinSec): number {
    const { degrees, minutes, seconds } = dms;
    return degrees + minutes / 60 + seconds / 3600;
  },
};
