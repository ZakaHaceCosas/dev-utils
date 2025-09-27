<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `perf-utils`

Some functions to take results from your benchmarks and give you accurate "_we made foobar `n` times faster_" numbers.

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/perf-utils
# npm
npx jsr add @zakahacecosas/perf-utils
# yarn
yarn add jsr:@zakahacecosas/perf-utils
# pnpm
pnpm add jsr:@zakahacecosas/perf-utils
# bun
bunx jsr add @zakahacecosas/perf-utils
```

## Features

- Improvement percentage ("foobar is now 60% faster").
- Time reduction percentage ("foobar now takes 40% less time").
- Times faster! ("foobar is now 2 times faster!!").

Uses basic math for this.

## Documentation

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/perf-utils/doc/).

All functions have rich JSDoc (~~examples included~~) anyway, so your editor itself works as your documentation.
