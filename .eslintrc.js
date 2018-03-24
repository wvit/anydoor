module.exports = {
    "env": {
        "browser": false,
        "commonjs": true,
        "node":true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console":["error"],
        "no-unused-vars":["off"],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};