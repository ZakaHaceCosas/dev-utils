# changelog

## 1.5.0 (unreleased)

- new functions:
  - `normalizeArray(strArr)`, and `softly` and `strictly` variants, to normalize all strings of an array.

- changes:
  - now `validate(str)` will `normalize(str)`, meaning it'll be more precise

- fixes:
  - fixed some messed up JSDoc
  - fixed typos

## 1.4.0

- new functions:
  - `isPalindrome(str)`, checks if the given string is a palindrome or not

- changes:
  - `normalize(str)` now can take:
    - a second `true` argument to make the normalization stricter (less human readable but more compact).
    - a third `true` argument to strip CLI colors (ensuring CLI-ish strings are normalized as well).

## 1.3.0

- new functions:
  - `sortAlphabetically(strArr)`, alphabetically sorts a string array and returns a new array
  - `spaceString(str)`, to append or prepend space to a string

## 1.2.0

- new functions:
  - `normalize(str)`, normalizes a string so it can be used for things like search queries, tags, etc...
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
  - `validate(str)`, validates if a string is, indeed, a string, or anything else (undefined, null, etc...). considers `""` invalid.
- new type:
  - `UnknownString` (export)

## 1.0.0

- initial release
