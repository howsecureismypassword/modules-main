"use strict";

var L = require("library");
var characterSets = require("character-sets");
var defaults = {
    calculationsPerSecond: 1e10
};

var options = {};

var hsimp = function (password) {
    var self = {};
    var possibleCharacters = characterSets(password).getPossibleCharacters();
    var possibleCombinations = Math.pow(possibleCharacters, password.length);

    self.getPossibleCombinations = function () {
        return possibleCombinations;
    };

    self.getTimeInSeconds = function () {
        return possibleCombinations / options.calculationsPerSecond;
    };

    return self;
};

hsimp.setOptions = function (opts) {
    options = L.defaults(defaults, opts);
};

hsimp.setOptions(defaults);

module.exports = hsimp;
