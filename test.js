"use strict";

/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var hsimp = require("./bootstrap")(require("./main"));

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
    },
    "Checks": {
        "password": function () {
            assert.equals(hsimp("password").getChecks().length, 4);
        },
        "password string": function () {
            assert.equals(hsimp("password").getString(), "Instantly");
        },
        "password time": function () {
            assert.equals(hsimp("password").getTimeInSeconds(), 0);
        }
    },
    "Security Level": {
        "instant": {
            "top10k": function () {
                assert.equals(hsimp("password").getSecurityLevel(), "insecure");
            }
        },
        "bad": {
            "short": function () {
                assert.equals(hsimp("dddddddddddd").getSecurityLevel(), "bad");
            }
        },
        "ok": {
            "short": function () {
                assert.equals(hsimp("akduekfiejsiej").getSecurityLevel(), "ok");
            },
            "long with warning": function () {
                assert.equals(hsimp("rrrhhhrrrhhhrrrhhhrrrhhh").getSecurityLevel(), "ok");
            }
        },
        "good": {
            "short": function () {
                assert.equals(hsimp("ILikeToMoveItMoveItYeah!").getSecurityLevel(), "good");
            }
        }
    }
});
