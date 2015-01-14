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
    }
});