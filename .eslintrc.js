module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:unicorn/recommended',
  ],
  globals: {
    module: 'readonly',
    console: 'readonly',
    debugger: 'readonly',
    jest: 'readonly',
    require: 'readonly',
  },
  plugins: ['eslint-comments', 'jest'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // Tringapps standard rules
    'no-promise-executor-return': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'consistent-this': 'error',
    'default-case-last': 'error',
    'default-param-last': 'off',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',
    'no-caller': 'error',
    'no-octal-escape': 'error',
    'no-constructor-return': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'prefer-regex-literals': 'error',
    'require-await': 'error',
    'no-label-var': 'error',
    'no-shadow': 'off',
    'line-comment-position': ['error', {position: 'above'}],
    'new-cap': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-continue': 'error',
    'no-inline-comments': 'error',
    'no-multi-assign': 'error',
    'no-new-object': 'error',
    'no-plusplus': 'error',
    'no-underscore-dangle': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-constructor': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    radix: 'error',
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-aggregating-enable': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unused-enable': 'error',

    // Update recommended rules to match our requirements
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
          camelCase: true,
        },
      },
    ],

    /**
     * === Intentionally Disabled Rules Below ===
     *
     * This section disables some rules that are set by other
     * library recommendations. In some cases, this will disable some default
     * properties of the rule, but also enable others because the rule
     * (object property) names must be unique.
     */

    'handle-callback-error': 'off',
    'jest/no-focused-tests': 'off',
    'jest/no-disabled-tests': 'off',
    'no-catch-shadow': 'off',
    'no-div-regex': 'off',
    'no-extra-bind': 'off',
    'no-undef-init': 'off',
    'no-mixed-requires': 'off',
    'no-new-requires': 'off',
    'no-path-concat': 'off',
    'no-restricted-modules': 'off',
    yoda: 'off',

    /**
     * These are common industry-standard abbreviated names. They are used
     * by many existing projects and libraries, and for example, the literal
     * terms `props` and `ref` are React-specific as well
     */
    // Some APIs require the use of 'null'
    'unicorn/no-null': 'off',
    'unicorn/catch-error-name': 'off',

    'unicorn/numeric-separators-style': 'off',

    // Many configuration files use module.exports
    'unicorn/prefer-module': 'off',

    // This is triggered by `.match` methods such as those used by redux actions
    'unicorn/prefer-regexp-test': 'off',

    /**
     * Fixable rules -- these are rules that are enabled by the fix
     * configuration. They need to be resolved before committing, but it is
     * often useful to allow these during active development, so we leave them
     * out of the development configuration.
     */
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unreachable': 'off',

    /*  fix rules*/

    'no-else-return': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-useless-return': 'error',
    'wrap-iife': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'never'],
    'prefer-object-spread': 'error',
    'spaced-comment': ['error', 'always'],
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-template': 'error',

    /**
     * These rules can't be fixed automatically, but they may be useful during
     * active development. They are included here so that they can be
     * corrected before committing.
     */
    'no-alert': 'error',
    'react/jsx-boolean-value': 'error',

    'react/jsx-key': 'error',
    'react/no-string-refs': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/self-closing-comp': 'error',
    'react-native/no-inline-styles': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          i: {
            index: false,
          },
          prop: {
            property: false,
          },
          props: {
            properties: false,
          },
          params: {
            parameters: false,
          },
          ref: {
            reference: false,
          },
          env: {
            environment: false,
          },
        },
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'etc/no-commented-out-code': 'error',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'etc'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        'etc/no-misused-generics': 'error',
        'etc/no-implicit-any-catch': 'error',
        'etc/no-internal': 'error',
        'etc/no-deprecated': 'error',
        'etc/no-t': 'off',

        /**
         * === Intentionally Disabled Rules Below ===
         */

        /**
         * This will trigger a false positive for type guards (`name is Type`)
         */
        'no-undef': 'off',

        /**
         * These will trigger an error in type declarations, e.g.
         * const type = (prop: Type) => ReturnType
         *
         * In this case, eslint considers `prop` to be an unused variable which
         * results in a lot of false positives. Similar errors are handled by
         * the TypeScript compiler itself and other 'no-unused' options
         * available.
         */
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',

        /**
         * This requires developers to specify a return type in certain cases
         * such as when defining functions. Inferring types is preferred, so
         * this can be avoided in cases where generics are not used
         */
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        /**
         * Commented-out code should not be committed, but this is very useful
         * when actively developing. Thus, the rule is disabled here and will
         * be disabled for fix/pre-commit rules
         */
        'etc/no-commented-out-code': 'off',
      },
    },
    {
      files: ['**/*.test.ts', 'setup-jest.ts'],
      rules: {
        /**
         * In order to properly create some mocks, we may need to import from
         * other libraries within those mocks. Jest only allows declarations in
         * the mock scope, so to use those third party libraries, we must use
         * `require` inside of that scope. For simplicity, we disable this rule
         * for the testing files
         */
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        /**
         * Manual type declarations may need to define a default export for
         * third party libraries
         */
        'import/no-default-export': 'off',
      },
    },
  ],
};
