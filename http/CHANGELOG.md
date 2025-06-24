# `http-utils` CHANGELOG

## 2.0.0

### Added

- Added `IResponse` for fulfilled responses, obtained via `request()`. These don't need `await` or `.clone().*` to access property functions like `.json()`, `.arrayBuffer()`, and so on.
- Added `getCookie()`, `deleteCookie()`, and `createCookie()`.

### Changed

- Refactored the package so functions can be separately imported, improving tree shaking and reducing verbosity. (BREAKS).
- Now `request()` returns more data (`FormData`, `Blob`, `status`...).
- Now `genCookie()` takes an object instead of individual parameters. (BREAKS).

## 1.1.0

- New functions:
  - `download()`

- Changes:
  - Now `request()` also returns `response.body`

## 1.0.0

- Initial release.
