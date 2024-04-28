/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["base"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.lint.json",
	},
};
