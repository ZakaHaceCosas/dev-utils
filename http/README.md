<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/` | `@zhc.js/`

# `http-utils`

A few functions for helping with HTTP. Works with NodeJS, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

## Installation

```bash
# deno, yarn, or pnpm
deno add jsr:@zakahacecosas/http-utils
yarn add jsr:@zakahacecosas/http-utils
pnpm add jsr:@zakahacecosas/http-utils
# npm or bun (the org here is different)
npm install @zhc.js/http-utils
bun add @zhc.js/http-utils
# you can use npx/bunx jsr add... too, but it doesn't work with every nodejs project
```

## Feature highlights

- Parse and build URL parameter strings.
- Timeout requests without boilerplate code.
- Make generic JSON, body, and `Uint` requests with less LOC.
- Directly download remote files.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/http-utils/doc/).
