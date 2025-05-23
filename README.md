# Utils monorepo

A monorepo with different packages that provide great utilities for common tasks. They're all written in TypeScript and Deno (using NodeJS-compatible TypeScript code) and published to `jsr.io`, currently under [the `@zakahacecosas` scope](https://jsr.io/@zakahacecosas).

## Packages

| Package        |                                      Description |                                                                  Link |
| :------------- | -----------------------------------------------: | --------------------------------------------------------------------: |
| `string-utils` |            55+ string related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `number-utils` |            30+ number related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `geo-utils`    | 10+ vector & distance related utility functions. |    [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/geo) |
| `http-utils`   |                6 HTTP related utility functions. |   [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/http) |

`string-utils` includes tools for CLI-targeted string formatting, validation, formatting, casing, counting, replacing, etc... It is, to be fair, a VERY powerful string toolkit.

`number-utils` includes number and math tools like combinatorial functions, random integers, deg-rad conversion, celsius-fahrenheit conversions, the _classics_ (`isOdd()`, `isEven()`...), and many more.

`geo-utils` is a new and less complete package, it'll grow over time. It includes a few basic functions related to degree and vector math, and miles-kilometers conversion (also available in `number-utils`).

`http-utils` is the newest and least complete package, also set to grow over time. It includes a few basic functions related to HTTP, like request timeouts or cookie generation.

> [!TIP]
> Check [TODO.md](TODO.md) for info on what I plan to add.
