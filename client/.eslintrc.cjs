module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ["*.config.js", "*.config.cjs"],
      env: {
        node: true, // Recognizes Node.js environment
        es2020: true,
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off", // Turns off no-var-requires for config files
        "no-undef": "off", // Turns off no-undef for config files
      },
    },
  ],
};
