const babelJest = require('babel-jest');

const babelOptions = {
	presets: [
		'@babel/preset-react',
		'babel-preset-gatsby',
		'@babel/preset-typescript'
	]
};

module.exports = babelJest.default.createTransformer(babelOptions);
// "lint:md": "markdownlint-cli2 content/**/*.{md,mdx}",
