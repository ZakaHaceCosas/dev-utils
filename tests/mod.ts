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

Deno.test({
  name: "normalize works",
  fn: () => {
    assertEquals(
      StringUtils.normalize(
        "              heLLo mY    fAnTÁsTiCo    AmigO   ",
      ),
      "hello my fantastico amigo",
    );
    assertEquals(
      StringUtils.normalize(
        "              123_heLLo mY    fAnTÁsTiCo    AmigO   ",
        true,
      ),
      "123hellomyfantasticoamigo",
    );
  },
});

Deno.test({
  name: "sortAlphabetically works",
  fn: () => {
    assertEquals(
      StringUtils.sortAlphabetically(
        ["delta", "charlie", "alpha", "zulu", "bravo"],
      ),
      ["alpha", "bravo", "charlie", "delta", "zulu"],
    );
  },
});

Deno.test({
  name: "spaceString works",
  fn: () => {
    assertEquals(
      StringUtils.spaceString(
        "hi chat",
        2,
        4,
      ),
      "  hi chat    ",
    );
  },
});

Deno.test({
  name: "isPalindrome works",
  fn: () => {
    assertEquals(
      StringUtils.isPalindrome(
        "Hannah",
      ),
      true,
    );

    assertEquals(
      StringUtils.isPalindrome(
        "not a palindrome",
      ),
      false,
    );

    assertEquals(
      StringUtils.isPalindrome(
        "Do geese see God?",
      ),
      true,
    );
  },
});

const abnormalStringArray = ["", "", "   hÉlLo    ", "", "wöRld", "  123_abc ", ""];

Deno.test({
  name: "normalizeArray works",
  fn: () => {
    assertEquals(
      StringUtils.normalizeArray(abnormalStringArray),
      ["hello", "world", "123_abc"],
    );
  },
});

Deno.test({
  name: "softlyNormalizeArray works",
  fn: () => {
    assertEquals(
      StringUtils.softlyNormalizeArray(abnormalStringArray, false),
      ["hÉlLo", "wöRld", "123_abc"],
    );

    assertEquals(
      StringUtils.softlyNormalizeArray(abnormalStringArray, true),
      ["héllo", "wörld", "123_abc"],
    );
  },
});

Deno.test({
  name: "strictlyNormalizeArray works",
  fn: () => {
    assertEquals(
      StringUtils.strictlyNormalizeArray(abnormalStringArray),
      ["hello", "world", "123abc"],
    );
  },
});

Deno.test({
  name: "table works",
  fn: () => {
    assertEquals(
      StringUtils.table([
        { Name: "Zaka", Age: 50, Country: "Spain" },
        { Name: "Someone", Age: 25, Country: "Poland" },
      ]),
      `
┌──────────────────────┬──────────────────────┬──────────────────────┐
│ Name                 │ Age                  │ Country              │
├──────────────────────┼──────────────────────┼──────────────────────┤
│ Zaka                 │ 50                   │ Spain                │
│ Someone              │ 25                   │ Poland               │
└──────────────────────┴──────────────────────┴──────────────────────┘
            `.trim(),
    );
  },
});

console.log(
  `Testing ${Object.keys(StringUtils).length} functions.`,
);
