import { assertEquals } from "@std/assert";
import * as StringUtils from "./mod.ts";

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
  name: "removeVowels works",
  fn: () => {
    assertEquals(
      StringUtils.removeVowels("javascript"),
      "jvscrpt",
    );
  },
});

Deno.test({
  name: "removeConsonants works",
  fn: () => {
    assertEquals(
      StringUtils.removeConsonants("javascript"),
      "aai",
    );
  },
});

const testString =
  "Fun fact: This package was made for the sole purpose of testing new features for F**kingNode version 3.0, including a release command - for releasing this to JSR!";

Deno.test({
  name: "truncate works",
  fn: () => {
    assertEquals(
      StringUtils.truncate(
        testString,
        16,
      ),
      "Fun fact: This p...",
    );
    assertEquals(
      StringUtils.truncate(
        testString,
        16,
        true,
      ),
      "Fun fact: This...",
    );
  },
});

Deno.test({
  name: "truncateWords works",
  fn: () => {
    assertEquals(
      StringUtils.truncateWords(
        testString,
        5,
      ),
      "Fun fact: This package was...",
    );
    assertEquals(
      StringUtils.truncateWords(
        testString,
        0,
      ),
      "...",
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
  name: "validateAgainst works",
  fn: () => {
    assertEquals(
      StringUtils.validateAgainst(
        "hey",
        ["hi", "hello"],
      ),
      false,
    );
    assertEquals(
      StringUtils.validateAgainst(
        "hello",
        ["hi", "hello"],
      ),
      true,
    );
    assertEquals(
      StringUtils.validateAgainst(
        "hey",
        ["hi", "hello"],
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
        "              heLLo mY    fAnTÁsTiC    AmiGO   ",
      ),
      "hello my fantastic amigo",
    );
    assertEquals(
      StringUtils.normalize(
        "              123_heLLo mY    fAnTÁsTiC    AmiGO   ",
        { strict: true },
      ),
      "123hellomyfantasticamigo",
    );
    assertEquals(
      StringUtils.normalize(
        "              123_heLLo mY    fAnTÁsTiC    AmiGO   ",
        { strict: true, preserveCase: true },
      ),
      "123heLLomYfAnTAsTiCAmiGO",
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
    assertEquals(
      StringUtils.stripCliColors(
        "\e[32mGreen text\e[0m",
      ),
      "Green text",
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
      false,
    );

    assertEquals(
      StringUtils.isPalindrome(
        "Do geese see God?",
        true,
      ),
      true,
    );
  },
});

Deno.test({
  name: "isAnagram string works",
  fn: () => {
    assertEquals(
      StringUtils.isAnagram(
        "hi",
        "ih",
      ),
      true,
    );
    assertEquals(
      StringUtils.isAnagram(
        "hi",
        "hi",
      ),
      false,
    );
  },
});

const abnormalStringArray = [
  "",
  "",
  "   hÉlLo    ",
  "",
  "wöRld",
  "  123_abc ",
  "",
];

Deno.test({
  name: "normalizeArray works",
  fn: () => {
    assertEquals(
      StringUtils.normalizeArray(abnormalStringArray),
      ["hello", "world", "123_abc"],
    );

    assertEquals(
      StringUtils.normalizeArray(abnormalStringArray, "soft"),
      ["hÉlLo", "wöRld", "123_abc"],
    );

    assertEquals(
      StringUtils.normalizeArray(abnormalStringArray, "softer"),
      ["héllo", "wörld", "123_abc"],
    );

    assertEquals(
      StringUtils.normalizeArray(abnormalStringArray, "strict"),
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

Deno.test({
  name: "countWords works",
  fn: () => {
    assertEquals(
      StringUtils.countWords(
        "JS    is everywhere, JS runs anywhere, JS works nowhere",
      ),
      9,
    );
  },
});

Deno.test({
  name: "getFileExtension works",
  fn: () => {
    assertEquals(
      StringUtils.getFileExtension(
        "my_file.txt",
      ),
      "txt",
    );
    assertEquals(
      StringUtils.getFileExtension(
        "my_file",
      ),
      "my_file",
    );
    assertEquals(
      StringUtils.getFileExtension(
        "   ",
      ),
      undefined,
    );
    assertEquals(
      StringUtils.getFileExtension(
        "project.config.whatever.buzzword.json",
      ),
      "json",
    );
    assertEquals(
      StringUtils.getFileExtension(
        "a file with spaces? and special characters? i don't know.exe",
      ),
      "exe",
    );
  },
});

Deno.test({
  name: "pluralOrNot works",
  fn: () => {
    assertEquals(
      StringUtils.pluralOrNot(
        "leaf",
        2,
      ),
      "leaves",
    );
    assertEquals(
      StringUtils.pluralOrNot(
        "leaf",
        1,
      ),
      "leaf",
    );
  },
});

Deno.test({
  name: "isUpperCase works",
  fn: () => {
    assertEquals(
      StringUtils.isUpperCase(
        "Hi chat",
      ),
      false,
    );
    assertEquals(
      StringUtils.isUpperCase(
        "HI CHAT",
      ),
      true,
    );
  },
});

Deno.test({
  name: "isLowerCase works",
  fn: () => {
    assertEquals(
      StringUtils.isLowerCase(
        "Hi chat",
      ),
      false,
    );
    assertEquals(
      StringUtils.isLowerCase(
        "hi chat",
      ),
      true,
    );
  },
});

Deno.test({
  name: "splitSnakeCase works",
  fn: () => {
    assertEquals(
      StringUtils.splitSnakeCase(
        "some_variable_lol",
      ),
      ["some", "variable", "lol"],
    );
  },
});

Deno.test({
  name: "splitKebabCase works",
  fn: () => {
    assertEquals(
      StringUtils.splitKebabCase(
        "some-variable-lol",
      ),
      ["some", "variable", "lol"],
    );
  },
});

Deno.test({
  name: "splitCamelOrPascalCase works",
  fn: () => {
    assertEquals(
      StringUtils.splitCamelOrPascalCase(
        "someVariableLol",
      ),
      ["some", "variable", "lol"],
    );
    assertEquals(
      StringUtils.splitCamelOrPascalCase(
        "SomeVariableLol",
      ),
      ["some", "variable", "lol"],
    );
    assertEquals(
      StringUtils.splitCamelOrPascalCase(
        "Some VariableLol",
      ),
      ["some", "variable", "lol"],
    );
  },
});

Deno.test({
  name: "slugify works",
  fn: () => {
    assertEquals(
      StringUtils.slugify(
        "Some *nasty* string that wouldn't work as a URL!",
      ),
      "some-nasty-string-that-wouldnt-work-as-a-url",
    );
  },
});

Deno.test({
  name: "mask works",
  fn: () => {
    assertEquals(
      StringUtils.mask(
        "to be masked",
        { visibleChars: 2, maskChar: "#" },
      ),
      "##########ed",
    );
  },
});

Deno.test({
  name: "mask email works",
  fn: () => {
    assertEquals(
      StringUtils.maskEmail(
        "zaka@somewhere.com",
        { visibleChars: 1, maskChar: "#" },
      ),
      "###a@somewhere.com",
    );
  },
});

Deno.test({
  name: "toSnakeCase works",
  fn: () => {
    assertEquals(
      StringUtils.toSnakeCase(
        "the snake",
      ),
      "the_snake",
    );
  },
});

Deno.test({
  name: "toKebabCase works",
  fn: () => {
    assertEquals(
      StringUtils.toKebabCase(
        "kebab is tasty",
      ),
      "kebab-is-tasty",
    );
  },
});

Deno.test({
  name: "toCamelCase works",
  fn: () => {
    assertEquals(
      StringUtils.toCamelCase(
        "the camel",
      ),
      "theCamel",
    );
  },
});

Deno.test({
  name: "toPascalCase works",
  fn: () => {
    assertEquals(
      StringUtils.toPascalCase(
        "the pascal",
      ),
      "ThePascal",
    );
  },
});

Deno.test({
  name: "toLeetSpeak works",
  fn: () => {
    assertEquals(
      StringUtils.toLeetSpeak(
        "hello world!",
      ),
      "H3110 W0R1D!",
    );
  },
});

Deno.test({
  name: "toNerdCase works",
  fn: () => {
    assertEquals(
      StringUtils.toNerdCase(
        "uhm actually",
      ),
      "uHm aCtUaLlY",
    );
  },
});

Deno.test({
  name: "extractNumbers works",
  fn: () => {
    assertEquals(
      StringUtils.extractNumbers(
        "I have 2 JavaScript packages, 1 in npm (with like 40 downloads or so), and another one in JSR, which doesn't have a download counter. How many people got string-utils? 5? 55? 5000? Who kn0ws?",
      ),
      [2, 1, 40, 5, 55, 5000, 0],
    );
  },
});

Deno.test({
  name: "isValidEmail works",
  fn: () => {
    assertEquals(
      StringUtils.isValidEmail(
        "zaka@somewhere.com",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidEmail(
        "zaka@somewhere",
      ),
      false,
    );
    assertEquals(
      StringUtils.isValidEmail(
        "zaka.hace.cosas@somewhere.com.ar",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidEmail(
        "ZAKA@SOMEWHERE.COM",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidEmail(
        "óscar@somewhere.com",
      ),
      false,
    );
  },
});

Deno.test({
  name: "isValidHexColor works",
  fn: () => {
    assertEquals(
      StringUtils.isValidHexColor(
        "something random",
      ),
      false,
    );
    assertEquals(
      StringUtils.isValidHexColor(
        "#000000",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidHexColor(
        "#47FA93",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidHexColor(
        "#JAD2AD",
      ),
      false,
    );
    assertEquals(
      StringUtils.isValidHexColor(
        "#FF332211",
      ),
      true,
    );
    assertEquals(
      StringUtils.isValidHexColor(
        "#JJK2LA2A",
      ),
      false,
    );
  },
});

Deno.test({
  name: "cleanHtml works",
  fn: () => {
    assertEquals(
      StringUtils.cleanHtml(
        "<h1> I like cheese <br /> and <strong>ham</strong> </h1>",
      ),
      "&lt;h1&gt; I like cheese &lt;br &#47;&gt; and &lt;strong&gt;ham&lt;&#47;strong&gt; &lt;&#47;h1&gt;",
    );
  },
});

Deno.test({
  name: "fmtHtml works",
  fn: () => {
    assertEquals(
      StringUtils.fmtHtml(
        "&lt;h1&gt; I like cheese &lt;br &#47;&gt; and &lt;strong&gt;ham&lt;&#47;strong&gt; &lt;&#47;h1&gt;",
      ),
      "<h1> I like cheese <br /> and <strong>ham</strong> </h1>",
    );
  },
});

Deno.test({
  name: "escapeJS works",
  fn: () => {
    const raw = "Hello\u0001World\u0007!\u0009Tabbed\u000BVerticalTab\u007FDEL";
    const expected = "Hello\\u0001World\\u0007!\\u0009Tabbed\\u000BVerticalTab\\u007FDEL";

    assertEquals(
      StringUtils.escapeJS(raw),
      expected,
    );
  },
});

Deno.test({
  name: "getLongest works",
  fn: () => {
    assertEquals(
      StringUtils.getLongest(
        "xbox nintendo playstationThree playstationFive",
      ),
      "playstationThree",
    );
    assertEquals(
      StringUtils.getLongest(
        ["xbox", "nintendo", "playstationThree", "playstationFive"],
      ),
      "playstationThree",
    );
  },
});

Deno.test({
  name: "getRandomString works",
  fn: () => {
    console.debug(
      "RANDOM STRING (cannot be asserted)",
      StringUtils.getRandomString(15),
    );
  },
});

Deno.test({
  name: "getFirstWords works",
  fn: () => {
    assertEquals(
      StringUtils.getFirstWords(
        "xbox nintendo playstationThree playstationFive",
        1,
      ),
      "xbox",
    );
    assertEquals(
      StringUtils.getFirstWords(
        "xbox nintendo playstationThree playstationFive",
        3,
      ),
      "xbox nintendo playstationThree",
    );
  },
});

Deno.test({
  name: "testFlag works",
  fn: () => {
    assertEquals(StringUtils.testFlag("--test", "test", {}), true);
    assertEquals(StringUtils.testFlag("-test", "test", {}), true);
    assertEquals(StringUtils.testFlag("--t", "test", {}), false);

    assertEquals(
      StringUtils.testFlag("--t", "test", { allowQuickFlag: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlag("-t", "test", { allowQuickFlag: true }),
      true,
    );

    assertEquals(
      StringUtils.testFlag("-test", "test", { allowSingleDash: false }),
      false,
    );

    assertEquals(
      StringUtils.testFlag("--TeSt", "test", { allowNonExactString: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlag("--TEST", "test", { allowNonExactString: true }),
      true,
    );

    assertEquals(
      StringUtils.testFlag("--TeSt", "test", { allowNonExactString: false }),
      false,
    );
    assertEquals(
      StringUtils.testFlag("--test ", "test", { allowNonExactString: false }),
      true,
    );

    assertEquals(StringUtils.testFlag("--", "", {}), false);
    assertEquals(StringUtils.testFlag("--  ", "   ", {}), false);
  },
});

Deno.test({
  name: "testFlags works",
  fn: () => {
    assertEquals(StringUtils.testFlags(["--foo"], "foo"), true);
    assertEquals(
      StringUtils.testFlags(["-foo"], "foo", { allowSingleDash: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlags(["-f", "--foo"], "foo", { allowQuickFlag: true }),
      true,
    );
    assertEquals(StringUtils.testFlags(["--bar"], "foo"), false);
    assertEquals(
      StringUtils.testFlags(["-f", "--foo"], "foo", { allowSingleDash: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlags(["-f", "--bar"], "foo", { allowSingleDash: true }),
      false,
    );
    assertEquals(
      StringUtils.testFlags(["--Foo"], "foo", { allowNonExactString: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlags(["-- Foo "], "foo", { allowNonExactString: true }),
      false,
    );
    assertEquals(StringUtils.testFlags(["--foo"], ""), false);
    assertEquals(
      StringUtils.testFlags(["--Foo"], "foo", { allowNonExactString: true }),
      true,
    );
    assertEquals(
      StringUtils.testFlags(["-f"], "foo", { allowNonExactString: false }),
      false,
    );
    assertEquals(
      StringUtils.testFlags(["-t", "-x"], "test", { allowQuickFlag: true }),
      true,
    );
    assertEquals(StringUtils.testFlags(["-a", "--alpha"], "beta"), false);
  },
});

Deno.test({
  name: "chunk works",
  fn: () => {
    assertEquals(
      StringUtils.chunk("abcdef", 0, 3),
      "abc",
    );

    assertEquals(
      StringUtils.chunk("abcdef", 3, 5),
      "de",
    );
  },
});

Deno.test({
  name: "chunks works",
  fn: () => {
    assertEquals(
      StringUtils.chunks("abcdef", 3),
      ["abc", "def"],
    );

    assertEquals(
      StringUtils.chunks("abcdef", 6),
      ["abcdef"],
    );

    assertEquals(
      StringUtils.chunks("abcdef", 7),
      ["abcdef"],
    );

    assertEquals(
      StringUtils.chunks("abcdef", 5),
      ["abcde", "f"],
    );

    assertEquals(
      StringUtils.chunks("abcdef", 0),
      ["abcdef"],
    );
  },
});

Deno.test({
  name: "similarity works",
  fn: () => {
    assertEquals(
      StringUtils.similarity("abc", "abc"),
      1,
    );

    assertEquals(
      StringUtils.similarity("abc", "123"),
      0,
    );

    assertEquals(
      StringUtils.similarity("abc", "abd"),
      0.6666666666666666,
    );
  },
});

Deno.test({
  name: "countChars works",
  fn: () => {
    assertEquals(
      StringUtils.countChars("aaaaaa123"),
      {
        "a": 6,
        "1": 1,
        "2": 1,
        "3": 1,
      },
    );

    assertEquals(
      StringUtils.countChars("a a"),
      {
        "a": 2,
        " ": 1,
      },
    );

    assertEquals(
      StringUtils.countChars("a  a"),
      {
        "a": 2,
        " ": 2,
      },
    );
  },
});

Deno.test({
  name: "(class) StringArray works",
  fn: () => {
    const StringArray = StringUtils.StringArray;

    const mutated = new StringArray("a", "b");
    assertEquals(mutated.arr(), ["a", "b"]);

    const nonMutated = mutated.uppercaseAll(false);
    assertEquals(nonMutated.arr(), ["A", "B"]);

    mutated.uppercaseAll();
    assertEquals(mutated.arr(), ["A", "B"]);

    const pushed = new StringArray(["a", {}, ["b"]]);
    pushed.push("c", 5, "d", ["e", [], "f"]);
    assertEquals(pushed.arr(), ["a", "b", "c", "d", "e", "f"]);
  },
});
