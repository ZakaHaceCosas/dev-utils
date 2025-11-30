<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `number-utils`

A set of 30+ functions for numeric operation, conversion; among other uses. Works with NodeJS, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

## Installation

```bash
# deno, yarn, or pnpm
deno add jsr:@zakahacecosas/number-utils
yarn add jsr:@zakahacecosas/number-utils
pnpm add jsr:@zakahacecosas/number-utils
# npm or bun (the name here is different!)
npm install numeric-utils
bun add numeric-utils
# you can use npx/bunx jsr add... too, but it doesn't work with every nodejs project
# and the package name is different because someone holds an unmaintained "number-utils"
```

## Feature highlights

- The classics: `isOdd()`, `isEven()`, `isPositive()`, and `isNegative()`.
- Calculate how many possible combinations exists using combinatorial math.
- Less-seen checks, like `isPrime()`, `isPerfectSquare()`, or `isBetween()`.
- Greatest common divisor and least common multiple of two numbers.
- Sum and average of a `number[]`.
- Degrees to radians and vice versa.
- Feet to meters and vice versa.
- Kilometers per hour to miles per hour and vice versa.
- Even more!

## Documentation

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/number-utils/doc/).

All functions have rich JSDoc (examples included) anyway, so your editor itself works as your documentation.
