const path = require('path');

const {
	createPages,
	createSchemaCustomization,
	onCreateNode
} = require('./config/gatsby-node');

module.exports = {
	createPages,
	createSchemaCustomization,
	onCreateNode,
	onCreateWebpackConfig: ({ actions }) => {
		actions.setWebpackConfig({
			resolve: {
				alias: {
					'@': path.resolve(__dirname, 'src')
				},
				fallback: {
					fs: false,
					path: false
				}
			}
		});
	}
};
