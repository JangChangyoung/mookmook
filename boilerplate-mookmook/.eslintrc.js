module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-nested-ternary": 0,
    "arrow-body-style": 0,
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    "react/jsx-no-bind": 0,
    "prefer-const": 0,
    "import/order": 0,
    "react/jsx-boolean-value": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "."],
      },
    },
  },
};
