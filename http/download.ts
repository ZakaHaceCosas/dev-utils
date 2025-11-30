import fs from "node:fs";

/**
 * Given a URL, downloads a file and writes its contents (using the NodeJS `fs` API) to a given path. If file doesn't exist it's made, if already there, overwritten.
 * @param {string} url - URL from where to download.
 * @param {string} path - Path where to download.
 *
 * @example
 * ```ts
 * await download("https://sample.com/download/sample.exe", "./my-app.exe");
 * ```
 *
 * @returns {Promise<void>}
 */
export async function download(url: string, path: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

  const uint = new Uint8Array(await res.arrayBuffer());
  fs.writeFileSync(path, uint, { flag: "w" });
}
