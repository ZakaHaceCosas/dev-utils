# changelog

## 2.1.0

- new functions:
  - `testFlags(strArr, target, options)`, to run `testFlag()` for a string array

## 2.0.0

- breaking changes:
  - now `normalize` and `mask` take an options object instead of a list of parameters

- new functions:
  - `toNerdCase(str)`, for fUnNy string conversions
  - `toLeetSpeak(str)`, to convert a string to this style
  - `maskEmail(str, options)`, to mask an email address
  - `testFlag(str, target, options)`, to parse cli --flags

- other additions:
  - new `preserveCase` option for `normalize`
  - new configuration interfaces (`IMaskOptions`, `INormalizeOptions`, ...). they're all exported.

- fixes:
  - fixed JSDoc code links
  - fixed some JSDoc being messed up
  - fixed `reveal(str, delay)` only working with DenoJS (now `process.stdout` is used instead of `Deno.stdout`)

## 1.11.0

- new functions:
  - `countWords(str)`, to count words in a string
  - `getFileExtension(str)`, to get the extension of a file
  - `isValidEmail(str)` and `isValidHexColor(str)`, to validate strings
  - `cleanHtml(str)` and `fmtHtml(str)`, to sanitize HTML strings
  - `getLongest(str | strArr)`, to get the longest word in a string / string[]
  - `getRandomString(length)`, to generate a random string
  - `getFirstWords(str, n)`, to get the first n words of a string

## 1.10.0

- new functions:
  - `splitCamelOrPascalCase(str)`, to split both kinds of strings
  - `toCamelCase(str)`, `toPascalCase(str)`, `toSnakeCase(str)`, `toKebabCase(str)` to convert strings
  - `extractNumbers(str: string)` to extract all numbers from a string

## 1.9.0

- new functions:
  - `validateAgainst(str, against)`, to validate a string against a set of valid strings and assign those strings as the type of the string

- changes:
  - `mask(str, visibleChars, mask)` is now more performant (has less loops)

## 1.8.0

- new functions:
  - `reveal(str, delay)`, to step-by-step reveal a string in the CLI
  - `countOccurrences(str, search)`, to count how many times does `search` appear in `str`
  - `pluralOrNot(str, number)`, to make `str` plural if `number` is greater than 1
  - `isUpperCase(str)` and `isLowerCase(str)` to check if a string is all caps or all lowercase
  - `splitSnakeCase(str)` and `splitKebabCase(str)` to split these kinds of strings
  - `slugify(str)`, to make a string URL friendly
  - `mask(str, visibleChars, mask)`, to password-like mask a string ("hello!" -> "\*\*\*\*\*\*")
  - `isAnagram(strA, strB)`, to check if two strings are anagrams

- changes:
  - before, `isPalindrome(str)` strictly normalized strings, so "Hannah?" for example would be considered a palindrome. this is now off by default and can be re-enabled.

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
