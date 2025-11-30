<!-- markdownlint-disable md001 md041 -->

`@zakahacecosas/`

# `geo-utils`

A set of 10+ functions for interacting with vectors and distances. Works with NodeJS, Bun, Deno, and (if transpiled to JavaScript) with any web browser.

## Installation

```bash
# deno, yarn, or pnpm
deno add jsr:@zakahacecosas/geo-utils
yarn add jsr:@zakahacecosas/geo-utils
pnpm add jsr:@zakahacecosas/geo-utils
# npm or bun (the name here is different!)
npm install geos-utils
bun add geos-utils
# you can use npx/bunx jsr add... too, but it doesn't work with every nodejs project
# and the package name is different because someone holds an unmaintained "geo-utils"
```

## Feature highlights

- Convert miles to kilometers and vice versa.
- Convert radians to decimal degrees and vice versa.
- Convert decimal degrees to DMS objects.
- Get the haversine distance between to points.

## Documentation

All functions have rich JSDoc (examples included), so the editor itself counts as "documentation".

The module is fully documented in `jsr.io`, [click here for module documentation](https://jsr.io/@zakahacecosas/geo-utils/doc/).
