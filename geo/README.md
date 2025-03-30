<!-- markdownlint-disable md001 -->

`@zakahacecosas/`

# `geo-utils`

A set of +5 functions for interacting with vectors and distances. Works with NodeJS*, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

###### Sponsored by [FuckingNode](#fun-fact)

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/geo-utils
# npm
npx jsr add @zakahacecosas/geo-utils
# yarn
yarn dlx jsr add @zakahacecosas/geo-utils
# pnpm
pnpm dlx jsr add @zakahacecosas/geo-utils
# bun
bunx jsr add @zakahacecosas/geo-utils
```

> [!WARNING]
> Depending on what your project is based on, NodeJS may not be able to recognize the package. React Native's Metro for example struggles to resolve it, for those cases we recommend the following approach:
>
> ```ts
> // (geo.ts, or however you'd call this file)
> import * as g from "./node_modules/@zakahacecosas/geo_utils/mod.js";
>
> // name this the way you like
> // avoid exporting individual functions (like g.GeoUtils.DMSToDegrees()) as some of them don't work if not used from the full object
> export const GeoUtils = g.GeoUtils;
> ```

## Feature highlights

- Convert miles to kilometers and vice versa.
- Convert radians to decimal degrees and vice versa.
- Convert decimal degrees to DMS objects.
- Get the haversine distance between to points.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/geo-utils/doc/~/GeoUtils).

---

###### Fun fact

> This library was originally made to test in production the new `fkrelease` command, a new feature for FuckingNode v3.0, my make-NodeJS-less-annoying CLI utility. See [this repo](https://github.com/FuckingNode/FuckingNode) to learn more.
