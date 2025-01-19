// eslint.config.mjs
import prettierPlugin from 'eslint-plugin-prettier';
import html from "eslint-plugin-html";

export default [
	{
		files: ["**/*.js", "**/*.html"], // Adjust as needed
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			globals: {
				// Common for Roll20 project
				$20: false,
				_: false,
				__dirname: false,
				console: false,
				filterObjs: false,
				finishRoll: false,
				generateRowID: false,
				getActiveCharacterId: false,
				getAttrByName: false,
				getAttrs: false,
				getObj: false,
				getSectionIDs: false,
				getTranslationByKey: false,
				module: false,
				on: false,
				process: false,
				randomInteger: false,
				removeRepeatingRow: false,
				require: false,
				sendChat: false,
				setAttrs: false,
				setDefaultToken: false,
				startRoll: false,
			},
		},
		plugins: {
			prettier: prettierPlugin,
			html,
		},
		settings: {
			"html/javascript-mime-types": ["text/javascript", "text/worker"],
			"html/javascript-tag-names": ["script"],
			"html/html-extensions": [".html", ".htm"],
			"html/indent": "+2", // indentation is the <script> indentation plus two spaces.
			"html/report-bad-indent": "error",
		},
		rules: {
			"arrow-body-style": "off",
			camelcase: "off",
			"comma-dangle": [
				"error",
				{
					arrays: "only-multiline",
					objects: "only-multiline",
					imports: "never",
					exports: "never",
					functions: "only-multiline",
				},
			],
			eqeqeq: "error",
			"max-classes-per-file": "off",
			"no-bitwise": [
				"error",
				{
					allow: ["~"],
				},
			],
			"no-case-declarations": "off",
			"no-console": "off",
			"no-extra-semi": "error",
			"no-multi-assign": "off",
			"no-param-reassign": [
				"warn",
				{
					props: false,
				},
			],
			"no-plusplus": "off",
			"no-restricted-imports": "off",
			"no-underscore-dangle": "off",
			"no-undef": "error",
			"no-unused-expressions": [
				"error",
				{
					allowTernary: true,
				},
			],
			"no-unused-vars": "warn",
			"no-useless-concat": "error",
			"no-useless-escape": "off",
			"no-var": "error",
			"prefer-arrow-callback": "off",
			quotes: ["error", "single"],
			radix: "off",
			semi: ["error", "always"],
			strict: "error",
			"template-curly-spacing": ["error", "never"],
			"wrap-iife": ["error", "any"],
			// Prettier rules
			"prettier/prettier": [
				"error",
				{
					singleQuote: true,
					arrowParens: "always",
					useTabs: false,
					tabWidth: 2,
					endOfLine: "lf",
					semi: true,
					printWidth: 180,
					bracketSpacing: false,
				},
			],
		},
	},
	{
		// Disables ESLint rules that conflict with Prettier formatting
		rules: {
			"array-bracket-spacing": "off",
			"arrow-body-style": "off",
			"no-confusing-arrow": "off",
			"no-mixed-operators": "off",
			"object-curly-spacing": "off",
			"prefer-arrow-callback": "off",
			"space-before-function-paren": "off",
			// Add other Prettier-conflicting rules here as necessary
		},
	},
];
