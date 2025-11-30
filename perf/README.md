<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `perf-utils`

Some functions to take results from your benchmarks and give you accurate "_we made foobar `n` times faster_" numbers.

## Installation

```bash
# deno, yarn, or pnpm
deno add jsr:@zakahacecosas/perf-utils
yarn add jsr:@zakahacecosas/perf-utils
pnpm add jsr:@zakahacecosas/perf-utils
# npm or bun (the name here is different!)
npm install perfs-utils
bun add perfs-utils
# you can use npx/bunx jsr add... too, but it doesn't work with every nodejs project
# and the package name is different because someone holds an unmaintained "perf-utils"
```

## Features

- Improvement percentage ("foobar is now 60% faster").
- Time reduction percentage ("foobar now takes 40% less time").
- Times faster! ("foobar is now 2 times faster!!").

Uses basic math for this.

## Documentation

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/perf-utils/doc/).

All functions have rich JSDoc (~~examples included~~) anyway, so your editor itself works as your documentation.
