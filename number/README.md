<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `number-utils`

A set of 20+ functions for number operation, conversion; among other uses. Works with NodeJS*, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

###### Sponsored by [FuckingNode](#fun-fact)

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/number-utils
# npm
npx jsr add @zakahacecosas/number-utils
# yarn
yarn dlx jsr add @zakahacecosas/number-utils
# pnpm
pnpm dlx jsr add @zakahacecosas/number-utils
# bun
bunx jsr add @zakahacecosas/number-utils
```

> [!WARNING]
> Depending on what your project is based on, NodeJS may not be able to recognize the package. React Native's Metro for example struggles to resolve it, for those cases we recommend the following approach:
>
> ```ts
> // (number.ts, or however you'd call this file)
> import * as n from "./node_modules/@zakahacecosas/number_utils/mod.js";
>
> // name this the way you like
> // avoid exporting individual functions (like n.NumberUtils.isOdd()) as some of them don't work if not used from the full object
> export const NumberUtils = n.NumberUtils;
> ```

## Feature highlights

- The classics: `isOdd()`, `isEven()`, `isPositive()`, and `isNegative()`.
- Less-seen checks, like `isPrime()`, `isPerfectSquare()`, or `isBetween()`.
- Greatest common divisor and least common multiple of two numbers.
- Sum and average of a `number[]`.
- Degrees to radians and vice versa.
- Even more!

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/number-utils/doc/~/NumberUtils).

---

###### Fun fact

> This project was originally made to test in production the `fkrelease` command, a feature for F\*ckingNode, a make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/FuckingNode/FuckingNode) to learn more.
