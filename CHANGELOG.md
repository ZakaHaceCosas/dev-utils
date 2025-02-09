# changelog

## 1.8.0 (unreleased)

- new functions:
  - `reveal(str, delay)`, to step-by-step reveal a string in the CLI

## 1.7.1

- fix again stripCliColors (i hate regex)

## 1.7.0

- new functions:
  - `stripCliColors(str)` to strip `\x1b` and other CLI control characters used for coloring
  - `kominator(str, separator)` to divide a string using commas or a custom given separator

- fixes
  - fixed `normalize(str, _, true)` (`normalize` with `stripCliColors=true`) not properly removing non-x1b control characters

## 1.6.3

- okay i swear i think i fixed tables
- fixed them in CLIs too

## 1.6.2

- attempt to fix previous release

## 1.6.1

- fixes
  - `table(strArr)` will now use a col-width based on string length, for reasonably shorter tables

## 1.6.0

- new functions:
  - `table(strArr)`, taking an array of KV pairs and formatting them as a cool looking table

- fixes
  - fixed TS demanding valid string arrays for `normalizeArr(strArr)` even tho invalid strings are innerly handled
  - fixed minor typos with JSDoc

## 1.5.0

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
