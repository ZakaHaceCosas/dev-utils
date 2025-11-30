// deno-lint-ignore-file no-explicit-any
/**
 * A set of utilities for working with HTTP. Serving 9 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * @example
 * ```ts
 * import { setCookie } from "@zakahacecosas/http-utils";
 *
 * // (sample)
 * async function login(user_id: string) {
 *    const username = await getUsername(user_id);
 *    setCookie({
 *      name: "user_id",
 *      value: username,
 *      days: 365
 *    });
 * };
 * ```
 *
 * @example
 * ```ts
 * window.location.href = "https://mysite.com" + buildQueryParams({ redirected: "true" });
 * ```
 *
 * @example
 * ```ts
 * timeoutRequest("https://jsonplaceholder.typicode.com/posts/1", {}, 3000)
 *   .then((data) => console.log("Fetched:", data))
 *   .catch((err) => console.error("Request error:", err.message));
 * ```
 *
 * @module
 */

// * SECTION: TYPES * //

/** A fulfilled response where, unlike with a regular `Response`, you can access `.text()`, `.json()`, and etcetera without needing to clone the response. */
export interface IResponse {
  /** Was the request successful? */
  ok: boolean;
  /** HTTP status code. */
  status: number;
  /** Was the request redirected? */
  redirected: boolean;
  /** Function that returns the response as raw text. */
  text: () => string;
  /** Function that returns the response as parsed JSON. */
  json: () => any;
  /** Function that returns the response as a `Blob`. */
  blob: () => Blob;
  /** Function that returns the response as an `ArrayBuffer`. */
  buff: () => ArrayBuffer;
  /** Function that returns the response as a `FormData` object. */
  form: () => FormData;
  /** Function that returns the response as a `Uint8Array<ArrayBuffer>`. */
  uint: () => Uint8Array<ArrayBuffer>;
}

/** Parameters for {@linkcode setCookie} and {@linkcode genCookie}. */
export interface ICookieParams {
  /** Name of the cookie. Doesn't need to go thru `encodeURIcomponent()`. */
  name: string;
  /** Value (content) of the cookie. Doesn't need to go thru `encodeURIcomponent()`. */
  value: string;
  /** Duration, in days, of the cookie. */
  days: number;
}

// * SECTION: MODULE * //

/**
 * Extracts query parameters from a URL and returns them as an object.
 * @param {string} url - The URL to parse.
 *
 * @example
 * ```ts
 * parseQueryParams("https://example.com?name=John&age=30");
 * // { name: "John", age: "30" }
 * ```
 *
 * @returns {Record<string, unknown>} Object containing key-value pairs of query parameters.
 */
export function parseQueryParams(url: string): Record<string, unknown> {
  const params = new URLSearchParams(new URL(url).search);
  const queryObject: Record<string, unknown> = {};
  params.forEach((value, key) => {
    queryObject[key] = value;
  });
  return queryObject;
}

/**
 * Converts an object to a URL-encoded query string.
 * @param {Record<string, unknown>} params - Object with key-value pairs to convert.
 *
 * @example
 * ```ts
 * buildQueryParams({ name: "John", age: 30 });
 * // "?name=John&age=30"
 * ```
 *
 * @returns {string} URL query string starting with '?'.
 */
export function buildQueryParams(params: Record<string, unknown>): string {
  return `?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&")}`;
}

/**
 * Adds a timeout to an HTTP request. Prevents the request from hanging indefinitely.
 * @param {string} url - The URL to fetch.
 * @param {Record<string, string>} options - Fetch options.
 * @param {number} timeout - Timeout in milliseconds.
 *
 * @example
 * ```ts
 * await timeoutRequest("https://api.example.com/data", {}, 5000)
 *   .then(console.log)
 *   .catch(console.error);
 * ```
 *
 * @returns {Promise<unknown>} The parsed JSON response.
 */
export function timeoutRequest(url: string, options: Record<string, string>, timeout: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Request to ${url} timed out after ${timeout}ms.`)), timeout);
    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response.json());
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Returns the string to set a cookie with a specified name, value, and expiration time.
 * @param {ICookieParams} params - Cookie parameters.
 *
 * @example
 * ```ts
 * document.cookie = genCookie({
 *    name: "user",
 *    value: "John",
 *    days: 365
 * });
 * ```
 *
 * @returns {string} The string you'd use to generate the cookie.
 */
export function genCookie(params: ICookieParams): string {
  const { name, value, days } = params;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  return `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

/**
 * Creates a cookie with a specified name, value, and expiration time.
 * @param {ICookieParams} params - Cookie parameters.
 *
 * @example
 * ```ts
 * createCookie({
 *    name: "user",
 *    value: "John",
 *    days: 365
 * });
 * ```
 *
 * @returns {string} The string you'd use to generate the cookie, just in case you wanted it.
 */
export function createCookie(params: ICookieParams): string {
  const cookie = genCookie(params);
  document.cookie = cookie;
  return cookie;
}

/**
 * Retrieves the value of a cookie, given its name.
 * @param {string} name Name of the cookie.
 *
 * @example
 * ```ts
 * const userLogin = getCookie("UsrToken");
 * ```
 *
 * @returns {string} The cookie's value.
 */
export function getCookie(name: string): string {
  // this is a bit messy, but idk regex and asking AI is never an option so i made this shi- up
  // it works.
  const cookie = globalThis.document.cookie
    .slice(
      globalThis.document.cookie.indexOf(`${name}=`),
    )
    .split("=")[1]
    .split(";")[0];
  return decodeURIComponent(cookie);
}

/**
 * Deletes a cookie, given its name.
 * @param {string} name Name of the cookie.
 *
 * @example
 * ```ts
 * function logout() {
 *    console.log("Logging user out...");
 *    deleteCookie("UsrToken")
 * };
 * ```
 *
 * @returns {string} The cookie's value before it was deleted, just in case you wanted it.
 */
export function deleteCookie(name: string): string {
  const val = getCookie(name);
  globalThis.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  return val;
}

/**
 * Generic function to create and send any HTTP request, directly returning everything you could need.
 *
 * Removes the need for `.clone()` when accessing multiple properties.
 *
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method - HTTP method.
 * @param {string} url - Target URL.
 * @param {unknown} [body=null] - Body of the request, if applicable.
 * @param {Record<string, string>} [headers={}] - Headers to send with the request.
 *
 * @example
 * ```ts
 * const res = await request(
 *    "POST",
 *    "https://somewhere.com/api/v1/users",
 *    { name: "John", age: 69 },
 *    { "Content-Type": "application/json" }
 * );
 *
 * // all these work without .clone()
 * // and without awaiting again!
 * res.json();
 * res.text();
 * res.blob();
 * res.form();
 * res.ok;
 * ```
 *
 * @returns {Promise<IResponse>} Fulfilled response.
 */
export async function request(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  body: unknown | null = null,
  headers: Record<string, string> = {},
): Promise<IResponse> {
  const response: Response = await fetch(url, {
    method,
    headers: new Headers(headers),
    body: body ? JSON.stringify(body) : null,
  });

  const { ok, status, redirected } = response.clone();
  const buffer = await response.clone().arrayBuffer();
  const formData = await response.formData();

  const text = () => new TextDecoder().decode(buffer);
  const blob = () => new Blob([buffer]);
  const buff = () => buffer;
  const json = () => JSON.parse(new TextDecoder().decode(buffer));
  const form = () => formData;
  const uint = () => new Uint8Array(buffer);

  return {
    ok,
    status,
    redirected,
    text,
    blob,
    form,
    buff,
    json,
    uint,
  };
}
