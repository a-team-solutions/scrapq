# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [1.0.2] - 2018-08-03

- Added `select` selector, a custom selector
- Added `exists` selector
- `list` now accept both query and selector
- You can import selector instead of using `Q.` prefix
- Fixed `list` ignoring context
- Better internal naming
    - `QueryData` -> `Query`
    - `QueryDataType` -> `Selector`
