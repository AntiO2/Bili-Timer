# Changelog

## 1.1.0 - 2026-04-29

- Added nested sub-collection progress tracking: ring chart shows current sub-collection progress, bottom bar shows total collection progress ([#7](https://github.com/AntiO2/Bili-Timer/issues/7)).
- Fixed an issue where entries from previous sub-collections were incorrectly counted as "watched".
- Total progress bar colors now match the ring chart (pink for watched / blue for remaining), with a hover tooltip showing exact time.
- Added support for `.video-pod__item` flat-list collection structure.
- ![nested collection screenshot](./assets/nested.png)

## 1.0.3 - 2026-03-21

- Added support for `bangumi` play pages.
- Added support for `cheese` classroom play pages, including locked-course list parsing.
- Added bangumi duration estimation fallback and `(预估)` chart labeling.
- Expanded userscript matches and API access for Bilibili season data.
- Improved floating widget sizing, positioning, and two-line text layout.
- Updated README support notes for bangumi and classroom pages.
