"use strict";

var L = require("hsimp-library");

var dictionary = null;

var modules = {
    characterSets: require("hsimp-character-sets"),
    period: require("hsimp-period"),
    namedNumber: require("hsimp-named-number"),
    checker: require("hsimp-checker")
};

var defaults = {
    calculationsPerSecond: 1e10, // 10 billion
    good: 31557600e6, // 1 million years
    ok: 31557600 // 1 year
};

var options = {};

var hsimp = L.memoize(function (password) {
    if (!dictionary) {
        throw new Error("hsimp: dictionary not set");
    }

    var self = {};

    var characterSets = modules.characterSets(password);
    var possibleCharacters = characterSets.getPossibleCharacters();

    var possibleCombinations = Math.pow(possibleCharacters, password.length);
    var timeInSeconds = possibleCombinations / options.calculationsPerSecond;
    
    try {
        var period = modules.period(timeInSeconds);
        var periodLength = period.getLength();
        var formattedPeriodLength = modules.namedNumber(periodLength).getName();
        var periodName = formattedPeriodLength === "1" ? period.getSingular() : period.getPlural();

        var periodString = formattedPeriodLength + " " + periodName;
    } catch (error) {
        var periodString = dictionary.forever;
    }

    var checker =  modules.checker(password);
    var checks = checker.getChecks();

    self.getChecks = L.output(checks);

    var securityLevel = "bad";

    if (checker.isInsecure()) {
        securityLevel = "insecure";
        timeInSeconds = 0;
        periodString = dictionary.instantly;
    } else if (timeInSeconds >= options.good) {
        if (checker.hasWarnings()) {
            securityLevel = "ok";
        } else {
            securityLevel = "good";
        }
    } else if (timeInSeconds >= options.ok) {
        securityLevel = "ok";
    }

    self.getSecurityLevel = L.output(securityLevel);

    self.getPossibleCombinations = L.output(possibleCombinations);
    self.getTimeInSeconds = L.output(timeInSeconds);
    self.getString = L.output(periodString);
    self.getTimeString = L.output(periodString);

    return self;
});

hsimp.setDictionary = function (dic) {
    dictionary = dic;
};

hsimp.setPeriodDictionary = modules.period.setDictionary;
hsimp.setNamedNumberDictionary = modules.namedNumber.setDictionary;
hsimp.setCheckerDictionary = modules.checker.setDictionary;

hsimp.setCharacterSets = modules.characterSets.setCharacterSets;
hsimp.setCheckerChecks = modules.checker.setChecks;

hsimp.setOptions = function (opts) {
    options = L.defaults(defaults, opts);
};

hsimp.setOptions(defaults);

module.exports = hsimp;
