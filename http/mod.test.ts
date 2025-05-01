import { HttpUtils } from "./mod.ts";
import { assertEquals, assertRejects, assertStringIncludes } from "@std/assert";

Deno.test({
  name: "parseQueryParams works",
  fn: () => {
    const url = "https://example.com?name=John&age=30";
    const result = HttpUtils.parseQueryParams(url);
    assertEquals(result, { name: "John", age: "30" });
  },
});

Deno.test({
  name: "buildQueryParams works",
  fn: () => {
    const params = { name: "John", age: 30 };
    const result = HttpUtils.buildQueryParams(params);
    assertEquals(result, "?name=John&age=30");
  },
});

Deno.test({
  name: "timeoutRequest works",
  fn: async () => {
    globalThis.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "ok" }),
      } as Response);

    const result = await HttpUtils.timeoutRequest("https://fake.url", {}, 1000);
    assertEquals(result, { message: "ok" });

    globalThis.fetch = () => new Promise(() => {}); // never resolves
    await assertRejects(() => HttpUtils.timeoutRequest("https://timeout.url", {}, 10));
  },
});

Deno.test({
  name: "genCookie works",
  fn: () => {
    const result = HttpUtils.genCookie("user", "John", 1);
    assertStringIncludes(result, "user=John;");
    assertStringIncludes(result, "expires=");
    assertStringIncludes(result, "path=/");
  },
});

Deno.test({
  name: "request works",
  fn: async () => {
    const dummyJson = { success: true };
    const dummyBuffer = new TextEncoder().encode(JSON.stringify(dummyJson)).buffer;

    globalThis.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dummyJson),
        arrayBuffer: () => Promise.resolve(dummyBuffer),
      } as Response);

    const { json, uint } = await HttpUtils.request("POST", "https://api.example.com", { test: 1 }, {
      "Content-Type": "application/json",
    });

    assertEquals(json, dummyJson);
    assertEquals(uint, new Uint8Array(dummyBuffer));

    globalThis.fetch = () =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

    await assertRejects(() => HttpUtils.request("GET", "https://api.example.com/404", {}, {}));
  },
});

Deno.test({
  name: "download works",
  fn: async () => {
    const dummyContent = "http-utils FTW";
    const dummyBuffer = new TextEncoder().encode(dummyContent).buffer;

    globalThis.fetch = () =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(dummyBuffer),
      } as Response);

    const tmpFile = "./test_output.txt";
    await HttpUtils.download("https://example.com/file", tmpFile);

    const saved = Deno.readFileSync(tmpFile);
    assertEquals(saved, new Uint8Array(dummyBuffer));
    Deno.removeSync(tmpFile); // clean up

    globalThis.fetch = () =>
      Promise.resolve({
        ok: false,
        statusText: "Not Found",
      } as Response);

    await assertRejects(
      () => HttpUtils.download("https://example.com/404", "./file.txt"),
      Error,
      "Failed to fetch: Not Found",
    );
  },
});
