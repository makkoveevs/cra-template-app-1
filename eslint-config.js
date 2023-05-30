module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:promise/recommended",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: "."
  },
  plugins: [
    "react",
    "react-hooks",
    "promise",
    "optimize-regex",
    "@typescript-eslint",
    "jest",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  rules: {
    "no-undef": "off",
    "react-hooks/exhaustive-deps": "off",
    indent: "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-template-curly-in-string": "off",
    "no-duplicate-imports": ["error", { includeExports: true }],
    "block-scoped-var": "error",
    curly: ["error", "all"],
    eqeqeq: "error",
    "no-alert": "warn",
    "no-console": "warn",
    "no-implicit-coercion": "off",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-multi-spaces": "error",
    "no-negated-condition": "off",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true }
    ],
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "prefer-promise-reject-errors": "error",
    radix: "error",
    "no-undefined": "off",
    "array-bracket-newline": ["error", "consistent"],
    "comma-dangle": ["error", "never"],
    "comma-style": "error",
    "eol-last": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "new-parens": "error",
    "no-bitwise": "warn",
    "no-lonely-if": "warn",
    "no-multiple-empty-lines": "error",
    "no-new-object": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "object-curly-newline": "error",
    "object-curly-spacing": ["error", "always"],
    "semi-spacing": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "space-in-parens": "error",
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "switch-colon-spacing": "error",
    "arrow-body-style": ["error", "as-needed"],
    // "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": "error",
    "generator-star-spacing": ["error", "after"],
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "object-shorthand": ["error", "always"],
    "prefer-arrow-callback": "warn",
    "prefer-destructuring": "off",
    "rest-spread-spacing": ["error", "never"],
    "template-curly-spacing": "error",
    "promise/always-return": "off",
    "optimize-regex/optimize-regex": "warn",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      { multiline: { delimiter: "semi" } }
    ],
    "@typescript-eslint/member-ordering": "off", // иначе ругается на flow экшны mobx
    "@typescript-eslint/brace-style": ["error", "1tbs"],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "off", // иначе ругается на i18nInstance.t<string>
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/2077
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true }
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_$" }
    ],
    "@typescript-eslint/no-floating-promises": [
      "off",
      { ignoreVoid: true, ignoreIIFE: true }
    ],
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      { allowAny: true }
    ],
    "@typescript-eslint/unbound-method": "off",
    "react/no-access-state-in-setstate": "error",
    "react/no-danger": "error",
    "react/no-multi-comp": ["warn", { ignoreStateless: true }],
    "react/no-this-in-sfc": "error",
    "react/prefer-stateless-function": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx",".jsx"] }],
    "react/jsx-no-bind": "off",
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-pascal-case": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "error",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        semi: true,
        tabWidth: 2,
        singleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true
      }
    ],
    "sonarjs/no-nested-template-literals": "off",
    "import/no-named-as-default-member": "off",
    "promise/prefer-await-to-then": "off",
    "no-nested-ternary": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "no-shadow": "off",
    "max-classes-per-file": "warn",
    "import/order": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "no-return-await": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/restrict-plus-operands": "off",
  },
  overrides: [
    {
      files: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
      env: {
        jest: true
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-alias-methods": "error",
        "jest/no-identical-title": "error",
        "jest/no-jasmine-globals": "error",
        "jest/no-jest-import": "error",
        "jest/no-test-prefixes": "error",
        "jest/no-test-callback": "warn",
        "jest/no-test-return-statement": "off",
        "jest/prefer-to-have-length": "warn",
        "jest/prefer-spy-on": "error",
        "jest/valid-expect": "error",
        "jest/no-try-expect": "off",
        "jest/no-conditional-expect": "error",
        "@typescript-eslint/ban-ts-comment": "off"
      }
    },
    {
      files: ["*.js", "*jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      }
    }
  ]
};
