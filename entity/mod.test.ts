import * as EntityUtils from "./mod.ts";
import { assertArrayIncludes } from "@std/assert";

Deno.test({
  name: "shuffle works",
  fn: () => {
    const testArr = ["a", "b", "c", "d", "e"];
    assertArrayIncludes(testArr, [EntityUtils.shuffle(testArr)]);
    const testObject = { a: "b", c: "d" };
    assertArrayIncludes(["b", "d"], [EntityUtils.shuffle(testObject)]);
  },
});

Deno.test({
  name: "shuffleK works",
  fn: () => {
    const testArr = ["a", "b", "c", "d", "e"];
    assertArrayIncludes(testArr, [EntityUtils.shuffleK(testArr)]);
    const testObject = { a: "b", c: "d" };
    assertArrayIncludes(["a", "c"], [EntityUtils.shuffleK(testObject)]);
  },
});
