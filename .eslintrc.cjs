module.exports = {
  settings: {
    jest: {
      version: require("jest/package.json").version,
    },
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx", "tests/*.ts"],
      env: { jest: true, node: true },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "new-cap": ["error", { capIsNew: false }],
  },
};
