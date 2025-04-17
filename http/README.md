<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `http-utils`

A few functions for helping with HTTP. Works with NodeJS*, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

###### Sponsored by [FuckingNode](#fun-fact)

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/http-utils
# npm
npx jsr add @zakahacecosas/http-utils
# yarn
yarn dlx jsr add @zakahacecosas/http-utils
# pnpm
pnpm dlx jsr add @zakahacecosas/http-utils
# bun
bunx jsr add @zakahacecosas/http-utils
```

> [!WARNING]
> Depending on what your project is based on, NodeJS may not be able to recognize the package. React Native's Metro for example struggles to resolve it, for those cases we recommend the following approach:
>
> ```ts
> // (http.ts, or however you'd call this file)
> import * as h from "./node_modules/@zakahacecosas/http_utils/mod.js";
>
> // name this the way you like
> // avoid exporting individual functions (like h.HttpUtils.request()) as some of them don't work if not used from the full object
> export const HttpUtils = h.HttpUtils;
> ```

## Feature highlights

- Parse and build URL parameter strings.
- Timeout requests without boilerplate code.
- Make generic JSON & Uint requests with less LOCs.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/http-utils/doc/~/HttpUtils).

---

###### Fun fact

> This project was originally made to test in production the `fkrelease` command, a feature for F\*ckingNode, a make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/FuckingNode/FuckingNode) to learn more.
