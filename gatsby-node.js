const path = require('path')

module.exports = {
  ...require('./config/gatsby-node'),
  onCreateWebpackConfig: ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        fallback: {
          fs: false,
          path: false,
        },
      },
    })
  },
}
