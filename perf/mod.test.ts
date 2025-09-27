import * as PerfUtils from "./mod.ts";
import { assertEquals } from "@std/assert";

Deno.test({
  name: "reduction works",
  fn: () => {
    assertEquals(
      PerfUtils.reduction(1000, 500),
      50,
    );
  },
});

Deno.test({
  name: "speedup works",
  fn: () => {
    assertEquals(
      PerfUtils.speedup(1000, 250),
      300,
    );
  },
});

Deno.test({
  name: "timesFaster works",
  fn: () => {
    assertEquals(
      PerfUtils.timesFaster(1000, 250),
      4,
    );
  },
});
