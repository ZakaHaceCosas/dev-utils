<!-- markdownlint-disable md001 -->

# `string-utils`

A great set of +45 functions for string capitalization, validation, and manipulation; among other uses. Works with NodeJS*, Bun, Deno, and (if transpiled to JavaScript) with any web browser. Includes features for CLIs.

###### Sponsored by [FuckingNode](#fun-fact)

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/string-utils
# npm
npx jsr add @zakahacecosas/string-utils
# yarn
yarn dlx jsr add @zakahacecosas/string-utils
# pnpm
pnpm dlx jsr add @zakahacecosas/string-utils
# bun
bunx jsr add @zakahacecosas/string-utils
```

> [!WARNING]
> Depending on what your project is based on, NodeJS may not be able to recognize the package. React Native's Metro for example struggles to resolve it, for those cases we recommend the following approach:
>
> ```ts
> // (string.ts, or however you'd call this file)
> import * as s from "./node_modules/@zakahacecosas/string_utils/mod.js";
>
> // name this the way you like
> // avoid exporting individual functions (like s.StringUtils.validate()) as some of them don't work if not used from the full object
> export const StringUtils = s.StringUtils;
> ```

## Feature highlights

### String validation

```ts
import { StringUtils, type UnknownString } from "@zakahacecosas/string-utils";
import { getInput } from "somewhere";

function greet(who: UnknownString) {
  if (!StringUtils.validate(who)) throw new Error("No name was specified!");
  console.log(`Hi, ${who}!`);
}

greet(null); // throws
greet("   "); // throws. if you did `if (!who) throw...` instead it'd log "Hi,    !"
greet("Dima"); // "Hi, Dima!"
```

`string-utils` offers a `validate(str)` function to ensure a string is valid. It handles `undefined`, `null`, and empty values (including spaces-only strings) without needing `.trim()`. It's also a type guard, so TS knows the string is safe to use after the call.

We also expose an `UnknownString` type (`"" | string | undefined | null`) for defining params that _maybe_ are a valid string (recommended for user-input-based variables).

### String normalization

```ts
import { StringUtils } from "@zakahacecosas/string-utils";

const query = "   mY  sEaRcH      qUÉry_1  ";

const str = StringUtils.normalize(query);
const str2 = StringUtils.normalize(query, true);
console.log(str); // "my search query_1"
console.log(str2); // "mysearchquery1"
```

`string-utils` offers a `validate(str, strict?, stripCliColors?)` function to normalize strings, so they're easier to work with. It removes outer and inner trailing spaces, lowercases everything, and replaces weird characters like `á` or `ë` with `a` and `e`.

When `true` passed as the 2nd argument, it also removes underscores, hyphens, and other non-alphanumeric characters. When `true` passed as the 3rd argument, it removes `\x1b` control characters used for coloring CLI strings.

### String capitalization

```ts
import { StringUtils } from "@zakahacecosas/string-utils";

// for reading
console.log(StringUtils.toUpperCaseFirst("javaScript")); // JavaScript
console.log(StringUtils.toLowerCaseFirst("JavaScript")); // javaScript

// for coding
console.log(StringUtils.toPascalCase("this is a variable")); // ThisIsAVariable
console.log(StringUtils.toKebabCase("this is a variable")); // this-is-a-variable
```

`string-utils` offers various capitalization methods like `toUpperCaseFirst(str)`, `toLowerCaseFirst(str)`, `capitalizeWords(str)`, or `toTitleCase(str)`. It also includes code capitalization methods like `toCamelCase(str)`, `toSnakeCase(str)`, and so on.

### CLI formatting

```ts
import { StringUtils } from "@zakahacecosas/string-utils";

console.log(StringUtils.table(
  [
    {
      Key: "Value",
      Key2: "Value 2",
    },
    {
      Key: "I'm a table!",
      Key2: "Value 3",
    },
  ],
));
/* output:
┌───────────────┬──────────┐
│ Key           │ Key2     │
├───────────────┼──────────┤
│ Value         │ Value 2  │
│ I'm a table!  │ Value 3  │
└───────────────┴──────────┘
*/
```

We also provide a `.table()` method, similar to `console.table()`. The difference is that we don't add the annoying `(idx)` column AND we don't give the JavaScript formatting to the table's contents; in other words:

```ts
import { StringUtils } from "@zakahacecosas/string-utils";

console.log(StringUtils.table(
  [
    {
      Key: "\x1b[31mValue\x1b[0m",
    },
  ],
));
/* output would look like this and "Value" would be red:
┌────────┐
│ Key    │
├────────┤
│ Value  │
└────────┘
*/

console.table({
  Key: "\x1b[31mValue\x1b[0m",
});
/* output would be like this:
┌───────┬────────────────────────┐
│ (idx) │ Values                 │
├───────┼────────────────────────┤
│ Key   │ "\x1b[31mValue\x1b[0m" │
└───────┴────────────────────────┘
*/
```

It's basically `console.table()` the way it should be.

### There's a lot more

There's 48 different functions, and that'd be a lot to write in here. You've got general utilities like `truncate(str)`, `mask(str, visibleChars, mask)`, `pluralOrNot(str, number)` or `normalizeArray(str)`, splitting utilities like `kominator(str, separator)` or `splitKebabCase(str)`, as well as `reveal(str)` for CLIs, `slugify(str)` for URLs, _and the list goes on_.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/string-utils/doc/~/StringUtils).

---

###### Fun fact

> This library was originally made to test in production the new `fuckingnode release` command, a work in progress feature for FuckingNode v3.0, the next version of my make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/ZakaHaceCosas/FuckingNode) to learn more.
