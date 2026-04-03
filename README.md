# Utils monorepo

A monorepo with different packages that provide great utilities for common tasks. They're all written in TypeScript and Deno (using NodeJS-compatible TypeScript code) and published to `jsr` under [the `@zakahacecosas` scope](https://jsr.io/@zakahacecosas), and to `npm` under the `@zhc.js/` scope.

## Packages

| Package *      |                                      Description |                                                                  Link |
| :------------- | -----------------------------------------------: | --------------------------------------------------------------------: |
| `string-utils` |             60 string related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `number-utils` |            35+ number related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `geo-utils`    | 10+ vector & distance related utility functions. |    [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/geo) |
| `http-utils`   |                9 HTTP related utility functions. |   [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/http) |
| `entity-utils` |                        (Yet a work in progress). | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/entity) |

`string-utils` includes tools for CLI-targeted string formatting, validation, formatting, casing, counting, replacing, etc... It is, to be fair, a VERY powerful string toolkit.

`number-utils` includes number and math tools like combinatorial functions, random integers, deg-rad conversion, celsius-fahrenheit conversions, the _classics_ (`isOdd()`, `isEven()`...), and many more.

`geo-utils` is a new and less complete package, it'll grow over time. It includes a few basic functions related to degree and vector math, and miles-kilometers conversion (also available in `number-utils`).

`http-utils` is a newer and lesser complete package, also set to grow over time. It includes cool functions related to HTTP, like timed out requests, fulfilled requests, and functions for working with cookies.

`entity-utils` is pretty much empty, but it's meant to include tools for both object and array manipulation.

> [!TIP]
> Check [TODO.md](TODO.md) for info on what I plan to add.
