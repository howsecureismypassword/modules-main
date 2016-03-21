module.exports = function (hsimp) {
    var dictionary = require("./dictionary");
    var periodDictionary = require("hsimp-period/period-dictionary");
    var namedNumberDictionary = require("hsimp-named-number/named-number-dictionary");
    var checkerDictionary = require("hsimp-checker/checker-dictionary");

    hsimp.setDictionary(dictionary);
    hsimp.setPeriodDictionary(periodDictionary);
    hsimp.setNamedNumberDictionary(namedNumberDictionary);
    hsimp.setCheckerDictionary(checkerDictionary);

    hsimp.setCharacterSets(require("hsimp-character-sets/character-sets.json"));

    var patternCheck = require("hsimp-checks/checks/patterns");
    var commonCheck = require("hsimp-checks/checks/common");

    patternCheck.setDictionary(require("hsimp-checks/dictionaries/patterns.json"));
    commonCheck.setDictionary(require("hsimp-checks/dictionaries/top10k.json"));

    hsimp.setCheckerChecks([patternCheck, commonCheck]);

    return hsimp;
}
