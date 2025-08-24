# `geo-utils` CHANGELOG

## 2.0.0

### Changed

- Refactored the package so functions can be separately imported, improving tree shaking and reducing verbosity. (BREAKS).

## 1.2.0

- New functions:
  - `isValidLat(lat)` and `isValidLon(lon)`
  - `isClose(pointA, pointB, threshold)`, to check if two points are close enough

## 1.1.1

- Fix JSDoc using wrong lib name (NumberUtils).

## 1.1.0

- New functions:
  - `feetToMeters()` and `metersToFeet()`

## 1.0.0

- Initial release.
