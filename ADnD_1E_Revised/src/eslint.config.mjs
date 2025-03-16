// eslint.config.mjs
import prettierPlugin from 'eslint-plugin-prettier';
import html from 'eslint-plugin-html';

export default [
  {
    files: ['**/*.js', '**/*.vue', '**/*.html'], // Adjust as needed
    ignores: [
        'node_modules/',
        'prod/',
        'dev/',
        '1ESheet.html'
      ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        // Common for Roll20 project
        console: false,
        on: false,
        process: false,
        randomInteger: false,
        getSectionIDs: false,
        getTranslationByKey: false,
        getAttrs: false,
        setAttrs: false,
        removeRepeatingRow: false,
        generateRowID: false,
        setDefaultToken: false,
        filterObjs: false,
        sendChat: false,
        getObj: false,
        getAttrByName: false,
        startRoll: false,
        finishRoll: false,
        getActiveCharacterId: false,
        $20: false,
        _: false,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      html,
    },
    settings: {
      'html/javascript-mime-types': ['text/javascript', 'text/worker'],
      'html/html-extensions': ['.html', '.htm'],
      'html/indent': '+2', // indentation is the <script> indentation plus two spaces.
      'html/report-bad-indent': 'error',
    },
    rules: {
      // ESLint recommended rules
      'no-unused-vars': 'warn',
      'no-unused-expressions': [
        'error',
        {
          allowTernary: true,
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'only-multiline',
          objects: 'only-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'only-multiline',
        },
      ],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-console': 'off',
      camelcase: 'off',
      radix: 'off',
      'no-underscore-dangle': 'off',
      'template-curly-spacing': ['error', 'never'],
      'no-useless-escape': 'off',
      'no-plusplus': 'off',
      'no-multi-assign': 'off',
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
      'no-bitwise': [
        'error',
        {
          allow: ['~'],
        },
      ],
      'max-classes-per-file': 'off',

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          arrowParens: 'always',
          useTabs: false,
          tabWidth: 2,
          endOfLine: 'lf',
          semi: true,
          printWidth: 180,
          bracketSpacing: false,
        },
      ],
    },
  },
  {
    // Disable ESLint rules that conflict with Prettier formatting
    rules: {
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-mixed-operators': 'off',
      'no-confusing-arrow': 'off',
      'space-before-function-paren': 'off',
      'array-bracket-spacing': 'off',
      'object-curly-spacing': 'off',
      // Add other Prettier-conflicting rules here as necessary
    },
  },
];
