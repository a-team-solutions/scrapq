# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [1.2.0] - 2018-MM-DD

- It is possible to scrap using `selector` instead of `queries`
- Selectors are using `_type` instead of `type`
- Selectors split to `/selectors` and `/controls`
- Fixed context has proper type
- Added `TODO.md`
- Better `/test` structure

## [1.1.0] - 2018-08-05

- Added support for nested
- Added `count` selector that returns number of elements
- Added `link` selector that returns `href` from an element
- Added `predicate` callback to `list` to filter elements

## [1.0.2] - 2018-08-03

- Added `select` selector, a custom selector
- Added `exists` selector
- `list` now accept both query and selector
- You can import selector instead of using `Q.` prefix
- Fixed `list` ignoring context
- Better internal naming
    - `QueryData` -> `Query`
    - `QueryDataType` -> `Selector`
