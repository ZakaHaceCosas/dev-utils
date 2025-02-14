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
      StringUtils.reverseString("yes sir!"),
      "!ris sey",
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
        "Fun fact: This package was made for the sole purpose of testing new features for F**kingNode version 3.0, including a release command - for releasing this to JSR!",
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
        "              heLLo mY    fAnTÁsTiC    AmigO   ",
      ),
      "hello my fantastic amigo",
    );
    assertEquals(
      StringUtils.normalize(
        "              123_heLLo mY    fAnTÁsTiC    AmigO   ",
        true,
      ),
      "123hellomyfantasticamigo",
    );
  },
});

Deno.test({
  name: "stripCliColors works",
  fn: () => {
    assertEquals(
      StringUtils.stripCliColors(
        "\x1b[31mRed text\x1b[0m",
      ),
      "Red text",
    );
    assertEquals(
      StringUtils.stripCliColors(
        "\x1b[2J\x1b[HClear screen and move cursor",
      ),
      "Clear screen and move cursor",
    );
    assertEquals(
      StringUtils.stripCliColors(
        "\x1b[38;5;82m256-color text\x1b[0m",
      ),
      "256-color text",
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
┌──────────┬─────┬─────────┐
│ Name     │ Age │ Country │
├──────────┼─────┼─────────┤
│ Zaka     │ 50  │ Spain   │
│ Someone  │ 25  │ Poland  │
└──────────┴─────┴─────────┘
            `.trim(),
    );

    assertEquals(
      StringUtils.table([{
        "Key": "Value",
        "Key2": "Value 2",
      }, {
        "Key": "Value3",
        "Key2": "Value4",
      }, {
        "Key": "Value5",
        "Key3": "Value6",
      }]),
      "Error: Unable to represent data. Row Key,Value5,Key3,Value6 is not consistent with the rest of the table.",
    );
  },
});

Deno.test({
  name: "kominator works",
  fn: () => {
    assertEquals(
      StringUtils.kominator("alpha,bravo,charlie"),
      ["alpha", "bravo", "charlie"],
    );
    assertEquals(
      StringUtils.kominator("alpha#bravo#charlie", "#"),
      ["alpha", "bravo", "charlie"],
    );
  },
});

Deno.test({
  name: "reveal works",
  fn: async () => {
    await StringUtils.reveal(
      "Test! This function does not return a value and instead writes to the stdout, making it harder to test.\nManually look at it!",
      5,
    );
  },
});

Deno.test({
  name: "countOccurrences works",
  fn: () => {
    assertEquals(
      StringUtils.countOccurrences(
        "JS is everywhere, JS runs anywhere, JS works nowhere",
        "JS",
      ),
      3,
    );
  },
});

console.log(
  `Testing ${Object.keys(StringUtils).length} functions.`,
);
