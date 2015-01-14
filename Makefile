SHELL := /bin/bash
PATH  := node_modules/.bin:make/bin:$(PATH)

.PHONY: build

build:
	browserify -s hsimp main.js | uglifyjs -m -c > main.min.js
