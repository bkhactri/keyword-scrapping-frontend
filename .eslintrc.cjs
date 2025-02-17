module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
  ],
  plugins: ["@typescript-eslint", "react-refresh"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "2020",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  rules: {
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "require-await": "error",
    "import/no-extraneous-dependencies": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "import/extensions": 0,
  },
};
