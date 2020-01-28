module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'indent': ['error', 'tab'],
		'semi': ['error', 'always'],


		'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
		'keyword-spacing': ['error', { overrides: { if: { after: false }, else: { after: true }, for: { after: false }, while: { after: false }, function: { after: false }, switch: { after: false }, catch: { after: false } } }],

		'new-parens': 'error',

		'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],

		'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

		'space-before-function-paren': ['error', 'never'],
		'space-before-blocks': ['error', 'always'],
		'arrow-body-style': ['error', 'as-needed'],
		'arrow-parens': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],

		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',

	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
