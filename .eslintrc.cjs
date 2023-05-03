module.exports = {
	env: {
		browser: true,
		es2021: true,
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
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
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
