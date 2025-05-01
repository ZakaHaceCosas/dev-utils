/**
 * A set of utilities for working with HTTP. Serving 6 functions.
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 *
 * _Note: Avoid using it as `const { fn } = HttpUtils`, it can cause issues._
 *
 * @example
 * ```ts
 * import { HttpUtils } from "@zakahacecosas/http-utils";
 *
 * // (sample)
 * async function login(user_id: string) {
 *    const username = await getUsername(user_id);
 *    document.cookie = HttpUtils.genCookie(username, user_id, 365);
 * };
 * ```
 *
 * @example
 * ```ts
 * window.location.href = "https://mysite.com" + HttpUtils.buildQueryParams({ redirected: "true" });
 * ```
 *
 * @example
 * ```ts
 * HttpUtils.timeoutRequest("https://jsonplaceholder.typicode.com/posts/1", {}, 3000)
 *   .then((data) => console.log("Fetched:", data))
 *   .catch((err) => console.error("Request error:", err.message));
 * ```
 *
 * @module
 */

import fs from "node:fs";

/**
 * A set of utilities for working with HTTP. Serving 6 functions.
 *
 * _Note: Avoid using it as `const { fn } = HttpUtils`, it can cause issues._
 *
 * @version 1.0.0
 * @author [ZakaHaceCosas](https://github.com/ZakaHaceCosas/)
 */
export const HttpUtils: {
  // * SECTION: MODULE_DEF * //

  /**
   * Extracts query parameters from a URL and returns them as an object.
   * @param {string} url - The URL to parse.
   *
   * @example
   * ```ts
   * HttpUtils.parseQueryParams("https://example.com?name=John&age=30");
   * // { name: "John", age: "30" }
   * ```
   *
   * @returns {Record<string, unknown>} Object containing key-value pairs of query parameters.
   */
  parseQueryParams(url: string): Record<string, unknown>;

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
  buildQueryParams(params: Record<string, unknown>): string;

  /**
   * Adds a timeout to an HTTP request. Prevents the request from hanging indefinitely.
   * @param {string} url - The URL to fetch.
   * @param {Record<string, string>} options - Fetch options.
   * @param {number} timeout - Timeout in milliseconds.
   *
   * @example
   * ```ts
   * await HttpUtils.timeoutRequest("https://api.example.com/data", {}, 5000)
   *   .then(console.log)
   *   .catch(console.error);
   * ```
   *
   * @returns {Promise<unknown>} The parsed JSON response.
   */
  timeoutRequest(url: string, options: Record<string, string>, timeout: number): Promise<unknown>;

  /**
   * Returns the string to set a cookie with a specified name, value, and expiration time.
   * @param {string} name - Cookie name.
   * @param {string} value - Cookie value.
   * @param {number} days - Days until expiration.
   *
   * @example
   * ```ts
   * document.cookie = HttpUtils.genCookie("user", "John", 365);
   * ```
   *
   * @returns {string} The cookie string.
   */
  genCookie(name: string, value: string, days: number): string;

  /**
   * Generic function to create and send any HTTP request, directly returning everything you could need.
   * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method - HTTP method.
   * @param {string} url - Target URL.
   * @param {unknown} [body=null] - Body of the request, if applicable.
   * @param {Record<string, string>} [headers={}] - Headers to send with the request.
   *
   * @example
   * ```ts
   * request("POST", "https://somewhere.com/api/v1/users", { name: "John", age: 69 }, { "Content-Type": "application/json" })
   *   .then(({ json }) => console.log(json));
   * ```
   *
   * @returns {Promise<{ json: any; uint: Uint8Array, body: ReadableStream<Uint8Array<ArrayBufferLike>> | null }>} Parsed JSON and raw bytes of the response.
   */
  request(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    body: unknown | null,
    headers: Record<string, string>,
  ): Promise<{ json: any; uint: Uint8Array; body: ReadableStream<Uint8Array<ArrayBufferLike>> | null }>;

  /**
   * Given a URL, downloads a file and writes its contents (using the NodeJS `fs` API) to a given path. If file doesn't exist it's made, if already there, overwritten.
   * @param {string} url - URL from where to download.
   * @param {string} path - Path where to download.
   *
   * @example
   * ```ts
   * import { HttpUtils } from "@zakahacecosas/http-utils";
   *
   * await HttpUtils.download(
   *    await HttpUtils.download("https://sample.com/download/sample.exe");
   *    "./my-app.exe",
   * )
   * ```
   *
   * @returns {Promise<void>}
   */
  download(url: string, path: string): Promise<void>;
} = {
  // * SECTION: MODULE_ITSELF * //

  // * MODULE: OWN * //

  parseQueryParams(url: string): Record<string, unknown> {
    const params = new URLSearchParams(new URL(url).search);
    const queryObject: Record<string, unknown> = {};
    params.forEach((value, key) => {
      queryObject[key] = value;
    });
    return queryObject;
  },

  buildQueryParams(params: Record<string, unknown>): string {
    return `?${Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&")}`;
  },

  timeoutRequest(url: string, options: Record<string, string>, timeout: number): Promise<unknown> {
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
  },

  genCookie(name: string, value: string, days: number): string {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    return `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  },

  async request(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    body: unknown | null = null,
    headers: Record<string, string> = {},
  ): Promise<{ json: any; uint: Uint8Array; body: ReadableStream<Uint8Array<ArrayBufferLike>> | null }> {
    const response = await fetch(url, {
      method,
      headers: new Headers(headers),
      body: body ? JSON.stringify(body) : null,
    });
    if (!response.ok) throw new Error(`Request failed with code ${response.status} (${response.statusText}).`);

    return {
      json: await response.json(),
      body: response.body,
      uint: new Uint8Array(await response.arrayBuffer()),
    };
  },

  async download(
    url: string,
    path: string,
  ): Promise<void> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

    const uint = new Uint8Array(await res.arrayBuffer());
    fs.writeFileSync(path, uint, { flag: "w" });
  },
};

// Description: Retrieves the value of a cookie by name.
// Usage: getCookie('user')
// getCookie(name: string): string | null {
//   const match = globalThis.document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
//   return match ? match[2] : null;
// },
// Description: Deletes a cookie by name.
// Usage: deleteCookie('user')
// deleteCookie(name: string): void {
//   globalThis.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
// },
