<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `geo-utils`

A set of 10+ functions for interacting with vectors and distances. Works with NodeJS*, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

## Installation

```bash
# deno
deno add jsr:@zakahacecosas/geo-utils
# npm
npx jsr add @zakahacecosas/geo-utils
# yarn
yarn add jsr:@zakahacecosas/geo-utils
# pnpm
pnpm add jsr:@zakahacecosas/geo-utils
# bun
bunx jsr add @zakahacecosas/geo-utils
```

> [!WARNING]
> Depending on what your project is based on, NodeJS with npm may not be able to recognize the package. React Native's Metro for example struggles to resolve it, for those cases we recommend the following approach:
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
