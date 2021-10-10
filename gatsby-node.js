const path = require('path');
const {
	onCreateNode,
	createSchemaCustomization,
	createPages
} = require('./config/gatsby-node');

module.exports = {
	onCreateNode,
	createSchemaCustomization,
	createPages,
	onCreateWebpackConfig: ({ actions }) => {
		actions.setWebpackConfig({
			resolve: {
				alias: {
					'@': path.resolve(__dirname, 'src')
				},
				fallback: {
					path: false,
					fs: false
				}
			}
		});
	}
};
