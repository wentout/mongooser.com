# asciinema player changelog

## 2.6.1 (2018-02-21)

* Fixed support for idle_time_limit embedded in the v2 recording
* Add support for italic text style

## 2.6.0 (2017-11-10)

* Added support for [asciicast v2](https://github.com/asciinema/asciinema/blob/develop/doc/asciicast-v2.md) recording format
* New option: `idle-time-limit`, for optimizing idle time
* Control bar now auto-hides and shows up again on mouse move
* Fixed escape seq handling in `poster` attribute
* Improved memory usage

## 2.5.0 (2017-08-27)

* License changed to Apache Software License V2
* Smaller file size of JS bundle
* Performance improvements
* `cols`/`rows` now affect internal VT size in addition to window size
* Fixed Unicode handling for codepoints >= 0x100000
* Fixed speed-up (>) / slow-down (<) keys

## 2.4.1 (2017-02-20)

* Fixed \e[1J handling when cursor is over last column
* Fixed NPT poster rendering
* Animation frame-rate is now capped to 30 FPS
* Corrected Solarized Light theme colors
* `CreatePlayer` can now accept parsed JSON asciicast as `url` arg
* Various performance optimizations

## 2.4.0 (2016-12-30)

* New properties, methods and events on `<asciinema-player>` DOM element
* Improvements to player's element initialization and shutdown
* Performance optimizations
* Various terminal emulation fixes

## 2.3.1 (2016-11-05)

* Fixed `<asciinema-player>` element loading under Chrome
* Upgraded Reagent (and thus React) dependency
* Changed paths of build artifacts

## 2.3.0 (2016-10-02)

* `<asciinema-player>` HTML5 element for even simpler self-hosting

## 2.2.0 (2016-04-22)

* New option: `preload`, for prefetching of recording on player initialization
* Changed namespace to asciinema.player
* Various terminal emulation fixes
* Internal refactoring

## 2.1.0 (2016-03-03)

* `startAt` option doesn't imply `autoPlay: true` anymore
* `startAt` option now accepts number of seconds or time in format "hh:mm:ss"
* `fontSize` option accepts any CSS `font-size` value (e.g. `15px`)
* Various terminal emulation fixes
* Support for live streaming from SSE (Server-Sent Events) endpoints
* `snapshot` option has been renamed to `poster` (old name still works)

## 2.0.0 (2016-01-06)

* New API
* Added support for direct playback of asciicast V1 format
* New option: `startAt`, for specifying playback start point (in seconds)
* Improved rendering of lines with non-monospace characters
* New keyboard shortcuts
* New themes: asciinema, Monokai
* Displaying title and author info in full-screen mode

## 1.2.0 (2015-04-23)

* Simplified API
* Keyboard shortcuts: space for pause/resume, "f" for toggle full-screen mode
* Official asciinema logo is now used as the big "play button"
* Fixed `loop` option in some edge cases
* Improved progress bar behavior

## 1.1.0 (2014-07-27)

* New option: `loop`
* Support for Powerline Symbols font
* Improved line height across devices/browsers
* Many minor visual tweaks and fixes
* New theme: Solarized Light

## 1.0.0 (2014-05-14)

* Rewritten using React.js
* Improved seeking performance

## 0.1 (2013-10-04)

* Initial version (source code in asciinema.org repository)
