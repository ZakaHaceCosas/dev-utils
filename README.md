# string-utils

###### Sponsored by [FuckingNode](#fun-fact)

A set of utility functions for string capitalization and manipulation.

## Install

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

## Highlights

### String validation

```ts
import { StringUtils, type UnknownString } from "@ZakaHaceCosas/string-utils";
import { getInput } from "somewhere";

function greet(who: UnknownString) {
  if (!StringUtils.validate(who)) throw new Error("No name was specified!");
  console.log(`Hi, ${who}!`);
}

greet("        "); // throws
greet(null); // throws
greet("Dima"); // "Hi, Dima!"
```

`string-utils` offers a `validate(str)` function to ensure a string is valid. It handles `undefined`, `null`, and empty values (including spaces-only strings) without needing `.trim()`. It's also a type guard, so TS knows the string is safe to use after the call.

We also expose an `UnknownString` type (`"" | string | undefined | null`) for defining params that _maybe_ are a valid string (recommended for user-input-based variables).

### String normalization

```ts
const query = "   mY  sEaRcH      qUÉry_1  ";

const str = StringUtils.normalize(query);
const str2 = StringUtils.normalize(query, true);
console.log(str); // "my search query_1"
console.log(str2); // "my search query1"
```

`string-utils` offers a `validate(str, strict?, stripCliColors?)` function to normalize strings, so they're easier to work with. It removes outer and inner trailing spaces, lowercases everything, and replaces weird characters like `á` or `ë` with `a` and `e`.

When `true` passed as the 2nd argument, it also removes underscores, hyphens, and other non-alphanumeric characters. When `true` passed as the 3rd argument, it removes `\x1b` control characters used for coloring CLI strings.

## Documentation

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/string-utils/doc/~/StringUtils).

---

###### Fun fact

> I simply made this library to test in production the new `fuckingnode release` command, a work in progress feature for FuckingNode v3.0.0, the next version of my make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/ZakaHaceCosas/FuckingNode) for more info about it.
