"use strict";

/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var hsimp = require("./main");
var periodDictionary = require("period/period-dictionary");
var namedNumberDictionary = require("named-number/named-number-dictionary");

hsimp.setPeriodDictionary(periodDictionary);
hsimp.setNamedNumberDictionary(namedNumberDictionary);

hsimp.setOptions({
    "calculationsPerSecond": 1e10
});

/**
 * Tests
 */
buster.testCase("hsimp", {
    "Possible Combinations": {
        "password": function () {
            assert.equals(hsimp("password").getPossibleCombinations(), 208827064576);
        },
        "Single Character": function () {
            assert.equals(hsimp("a").getPossibleCombinations(), 26);
        },
        "40 Characters": function () {
            assert.equals(hsimp("skdkfkdkfkekfkekfudkfieifidifieifieifiri").getPossibleCombinations(), 3.971311183896361e56);
        },
        "Mixed Character Sets": function () {
            assert.equals(hsimp("abc123ABC").getPossibleCombinations(), 13537086546263552);
        }
    },

    "Time In Seconds": {
        "wkjhfakjsdfh": function () {
            assert.equals(hsimp("wkjhfakjsdfh").getTimeInSeconds(), 9542895.666168218);
        },
        "Mixed Character Sets": function () {
            assert.equals(hsimp("abc123ABC").getTimeInSeconds(), 1353708.6546263553);
        }
    },

    "Time In Periods": {
        "1111111111": function () {
            assert.equals(hsimp("1111111111").getString(), "1 second");
        },
        "monkeycatfish": function () {
            assert.equals(hsimp("monkeycatfish").getString(), "8 years");
        },
        "BowT1esAreC00l": function () {
            assert.equals(hsimp("BowT1esAreC00l").getString(), "39 million years");
        },
        "8RTMRwNpDeP9JZb8ts77@W!fW@JC_Jtw9_Z!8rf#": function () {
            assert.equals(hsimp("8RTMRwNpDeP9JZb8ts77@W!fW@JC_Jtw9_Z!8rf#").getString(), "9 octodecillion years");
        }
    },
    "Time": {
        "BowT1esAreC00l": function () {
            assert.equals(hsimp("BowT1esAreC00l").getTimeString(), "39 million years");
        }
    }
});