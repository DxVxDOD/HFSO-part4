/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	moduleNameMapper: {'^(\\.\\.?\\/.+)\\.jsx?$': '$1'},
	moduleDirectories: [
		'node_modules',
		'/',
	],
};
