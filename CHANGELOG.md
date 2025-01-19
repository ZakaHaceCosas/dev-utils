# changelog

## 1.2.0

- new functions:
  - `normalize(str)`, normalizes a string so it can be used for things like
    search queries, tags, etc...
- added two examples to the module doc

## 1.1.0

- new functions:
  - `getLastChar(str)`, gets the last character of a string

## 1.0.2

- fix return type of `validate(str)` so TS knows it asserts `str`'s type
- add examples to all functions

## 1.0.1

(should've been 1.1.0 (new function), but i typed wrong version code, my bad)

- new functions:
  - `validate(str)`, validates if a string is, indeed, a string, or anything
    else (undefined, null, etc...). considers `""` invalid.
- new type:
  - `UnknownString` (export)

## 1.0.0

- initial release
