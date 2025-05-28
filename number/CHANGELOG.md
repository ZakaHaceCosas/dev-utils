# `number-utils` CHANGELOG

## 2.1.0 (Unreleased)

### Added

- `primeAt(n)` to get a prime number at the n-th index.

## 2.0.0

### Added

- All 5 combinatorial functions (C, V, P, VR, and PR), plus a utility function to calculate all possible combinations without needing to understand combinatorial.
- Kilometers per hour to miles per hour, and vice versa.
- Celsius to Fahrenheit and vice versa.

### Changed

- Refactored the package so functions can be separately imported, improving tree shaking and reducing verbosity. (BREAKS).
- Renamed `randomInt()` to `random()`.

## 1.3.0

- New functions:
  - `centimetersToInches()` and `inchesToCentimeters()`
- Fix JSDoc using wrong lib name (GeoUtils).

## 1.2.0

- New functions:
  - `feetToMeters()` and `metersToFeet()`

## 1.1.0

- New functions:
  - `kilometersToMiles()` and `milesToKilometers()`

## 1.0.0

- Initial release.
