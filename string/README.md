<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `string-utils`

A great set of 55+ functions for string capitalization, validation, and manipulation; among other uses. Works with NodeJS, Bun, Deno, and (if transpiled to JavaScript) with any web browser. Includes features for CLIs.

###### Sponsored by [FuckingNode](#fun-fact)

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/string-utils
# npm
npx jsr add @zakahacecosas/string-utils
# yarn
yarn add jsr:@zakahacecosas/string-utils
# pnpm
pnpm add jsr:@zakahacecosas/string-utils
# bun
bunx jsr add @zakahacecosas/string-utils
```

## Feature highlights

### String validation

```ts
import { type UnknownString, validate } from "@zakahacecosas/string-utils";
import { getInput } from "somewhere";

function greet(who: UnknownString) {
  if (!validate(who)) throw new Error("No name was specified!");
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
import { normalize } from "@zakahacecosas/string-utils";

const query = "   mY  sEaRcH      qUÉry_1  ";

const str = normalize(query);
const str2 = normalize(query, { strict: true });
console.log(str); // "my search query_1"
console.log(str2); // "mysearchquery1"
```

`string-utils` offers a `validate(str, options)` function to normalize strings, so they're easier to work with. It removes outer and inner trailing spaces, lowercases everything, and replaces weird characters like `á` or `ë` with `a` and `e`. When `strict` is set to `true`, it also removes underscores, hyphens, and other non-alphanumeric characters.

### String capitalization

```ts
import { toKebabCase, toLowerCaseFirst, toPascalCase, toUpperCaseFirst } from "@zakahacecosas/string-utils";

// for reading
console.log(toUpperCaseFirst("javaScript")); // JavaScript
console.log(toLowerCaseFirst("JavaScript")); // javaScript

// for coding
console.log(toPascalCase("this is a variable")); // ThisIsAVariable
console.log(toKebabCase("this is a variable")); // this-is-a-variable
```

`string-utils` offers various capitalization methods like `toUpperCaseFirst(str)`, `toLowerCaseFirst(str)`, `capitalizeWords(str)`, or `toTitleCase(str)`. It also includes code capitalization methods like `toCamelCase(str)`, `toSnakeCase(str)`, and so on.

### CLI formatting

```ts
import { table } from "@zakahacecosas/string-utils";

console.log(table(
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
import { table } from "@zakahacecosas/string-utils";

console.log(table(
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

We're currently serving 57 different functions, and that'd be a lot to write in here. You've got general utilities like `truncate(str)`, `mask(str, options)`, `pluralOrNot(str, number)` or `normalizeArray(str)`, splitting utilities like `kominator(str, separator)` or `splitKebabCase(str)`, as well as `reveal(str)` and `testFlag(str, target)` for CLIs, `slugify(str)` for URLs, _and the list goes on_.

## Documentation

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/string-utils/doc/).

All functions have rich JSDoc (examples included) anyway, so your editor itself works as your documentation.

---

###### Fun fact

> This project was originally made to test in production the `fkrelease` command, a feature for F\*ckingNode, a make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/FuckingNode/FuckingNode) to learn more.
