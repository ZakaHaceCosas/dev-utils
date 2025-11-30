<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `http-utils`

A few functions for helping with HTTP. Works with NodeJS, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

## Installation

```bash
# deno, yarn, or pnpm
deno add jsr:@zakahacecosas/https-utils
yarn add jsr:@zakahacecosas/https-utils
pnpm add jsr:@zakahacecosas/https-utils
# npm or bun (the name here is different!)
npm install https-utils
bun add https-utils
# you can use npx/bunx jsr add... too, but it doesn't work with every nodejs project
# and the package name is different because someone holds an unmaintained "geo-utils"
```

## Feature highlights

- Parse and build URL parameter strings.
- Timeout requests without boilerplate code.
- Make generic JSON, body, and `Uint` requests with less LOC.
- Directly download remote files.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/http-utils/doc/).
