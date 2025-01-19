import { assertEquals } from "@std/assert";
import { StringUtils } from "../mod.ts";

Deno.test({
  name: "toUpperCaseFirst works",
  fn: () => {
    assertEquals(
      StringUtils.toUpperCaseFirst("javaScript"),
      "JavaScript",
    );
  },
});

Deno.test({
  name: "toLowerCaseFirst works",
  fn: () => {
    assertEquals(
      StringUtils.toLowerCaseFirst("JavaScript"),
      "javaScript",
    );
  },
});

Deno.test({
  name: "capitalizeWords works",
  fn: () => {
    assertEquals(
      StringUtils.capitalizeWords("javaScript is cool"),
      "JavaScript Is Cool",
    );
  },
});

Deno.test({
  name: "toTitleCase works",
  fn: () => {
    assertEquals(
      StringUtils.toTitleCase("javaScript or typeScript, who's the best?"),
      "JavaScript or TypeScript, Who's the Best?",
    );
  },
});

Deno.test({
  name: "reverseString works",
  fn: () => {
    assertEquals(
      StringUtils.reverseString("type your code pls"),
      "slp edoc ruoy epyt",
    );
  },
});

Deno.test({
  name: "removeWhitespace works",
  fn: () => {
    assertEquals(
      StringUtils.removeWhitespace("j a v a s c r i p t"),
      "javascript",
    );
  },
});

Deno.test({
  name: "truncate works",
  fn: () => {
    assertEquals(
      StringUtils.truncate(
        "Fun fact: This package was made for the sole purpose of testing new features for F*ckingNode version 3.0, including a release command - for releasing this to JSR!",
        16,
      ),
      "Fun fact: This p...",
    );
  },
});

Deno.test({
  name: "validate works",
  fn: () => {
    assertEquals(
      StringUtils.validate(
        "valid",
      ),
      true,
    );
    assertEquals(
      StringUtils.validate(
        "",
      ),
      false,
    );
    assertEquals(
      StringUtils.validate(
        undefined,
      ),
      false,
    );
  },
});

Deno.test({
  name: "getLastChar works",
  fn: () => {
    assertEquals(
      StringUtils.getLastChar(
        "hi!",
      ),
      "!",
    );
    assertEquals(
      StringUtils.getLastChar(
        "line break\n",
      ),
      "\n",
    );
  },
});
