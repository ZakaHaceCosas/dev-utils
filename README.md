# Utils monorepo

A monorepo with different packages that provide great utilities for common tasks. They're all written in TypeScript and Deno (using NodeJS-compatible TypeScript code) and published to `jsr.io`, currently under [the `@zakahacecosas` scope](https://jsr.io/@zakahacecosas).

## Packages

| Package        |                                      Description |                                                                  Link |
| :------------- | -----------------------------------------------: | --------------------------------------------------------------------: |
| `string-utils` |            50+ string related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `number-utils` |            20+ number related utility functions. | [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/number) |
| `geo-utils`    | 10+ vector & distance related utility functions. |    [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/geo) |
| `http-utils`   |                6 HTTP related utility functions. |   [Repo](https://github.com/ZakaHaceCosas/dev-utils/tree/master/http) |

`string-utils` includes tools for CLI-targeted string formatting, validation, formatting, casing, etc... It is, to be fair, a very powerful string toolkit.

`number-utils` is newer and less complete, it'll grow over time. It includes basic functions like random integers, average, deg-rad conversion, the _classics_ (`isOdd()`, `isEven()`...), and a few more.

`geo-utils` is even newer and less complete, it'll also grow over time. It includes a few basic functions related to degree and vector math, and miles-kilometers conversion (also available in `number-utils`).

`http-utils` is the newest and least complete package, also set to grow over time. It includes a few basic functions related to HTTP, like request timeouts or cookie generation.

> [!TIP]
> Check [TODO.md](TODO.md) for info on what I plan to add.
