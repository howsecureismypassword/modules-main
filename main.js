"use strict";

var L = require("library");

var characterSets = require("character-sets");
var period = require("period");
var namedNumber = require("named-number");

var defaults = {
    calculationsPerSecond: 1e10
};

var options = {};

var hsimp = function (password) {
    var self = {};

    var possibleCharactersCheck = characterSets(password);
    var possibleCharacters = possibleCharactersCheck.getPossibleCharacters();

    var possibleCombinations = Math.pow(possibleCharacters, password.length);
    var timeInSeconds = possibleCombinations / options.calculationsPerSecond;

    var passwordPeriodCalculator = period(timeInSeconds);
    var passwordPeriodLength = passwordPeriodCalculator.getLength();
    var formattedLength = namedNumber(passwordPeriodLength).getName();

    var periodString = formattedLength + " " + (formattedLength === "1" ? passwordPeriodCalculator.getSingular() : passwordPeriodCalculator.getPlural());

    self.getPossibleCombinations = L.output(possibleCombinations);
    self.getTimeInSeconds = L.output(timeInSeconds);
    self.getString = L.output(periodString);
    self.getTimeString = L.output(periodString);

    return self;
};

hsimp.setPeriodDictionary = period.setDictionary;
hsimp.setNamedNumberDictionary = namedNumber.setDictionary;

hsimp.setOptions = function (opts) {
    options = L.defaults(defaults, opts);
};

hsimp.setOptions(defaults);

module.exports = hsimp;
