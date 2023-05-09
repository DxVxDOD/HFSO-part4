module.exports = {
	settings: {
		jest: {
		  version: require('jest/package.json').version,
		},
	  },
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: 'xo',
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
				'tests/*.ts'
			],
			env: {'jest': true, 'node': true} 
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		"new-cap": ["error", { "capIsNew": false }],
		"@typescript-eslint/naming-convention": [
			"error",
			{
			  "selector": "variable",
			  "format": [
				"camelCase",
				"PascalCase",
				"UPPER_CASE",
				"StrictPascalCase",
				"strictCamelCase"
			  ]
			},
			{
			  "selector": "function",
			  "format": [
				"camelCase",
				"PascalCase",
				"UPPER_CASE",
				"StrictPascalCase",
				"strictCamelCase"
			  ]
			},
			{
			  "selector": "typeLike",
			  "format": [
				"camelCase",
				"PascalCase",
				"UPPER_CASE",
				"StrictPascalCase",
				"strictCamelCase"
			  ]
			}
		  ]
	},
};
