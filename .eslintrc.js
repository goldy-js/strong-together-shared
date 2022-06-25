/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")

module.exports = {
  extends: getExtends(),
  plugins: getPlugins(),
  rules: getRules(),
  parserOptions: getParserOptions(),
  parser: "@typescript-eslint/parser",
  env: getEnv(),
  settings: getSettings(),
  ignorePatterns: ["lib"],
}

function getExtends() {
  return [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:jest-formatting/strict",
    "plugin:prettier/recommended",
  ]
}

function getPlugins() {
  return ["@typescript-eslint", "prettier", "jest", "jest-formatting"]
}

function getRules() {
  return {
    // JS
    "prettier/prettier": 2,
    "object-shorthand": ["error", "always"],
    "no-console": ["error"],
    "prefer-const": 2,

    // TS
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true },
    ],

    // Import
    "import/no-named-as-default-member": 0,
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "index",
          "parent",
          "sibling",
        ],
        "newlines-between": "always",
      },
    ],

    // Jest
    "jest/valid-describe-callback": 0,
    "jest/expect-expect": 0,
  }
}

function getParserOptions() {
  return {
    ecmaVersion: 12,
    project: [path.resolve(__dirname, "tsconfig.json")],
  }
}

function getEnv() {
  return {
    es2021: true,
    "jest/globals": true,
  }
}

function getSettings() {
  return {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  }
}
