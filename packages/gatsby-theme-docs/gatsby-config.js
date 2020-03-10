const withDefaults = require('./utils/default-options')

module.exports = options => {
  const { contenPath, useExternalMDX } = withDefaults(options)

  return {
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `gatsby-theme-docs`,
          path: contenPath,
        },
      },
      !useExternalMDX && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          defaultLayouts: {
            default: require.resolve('./src/components/layout.js')
          }
        }
      }
    ].filter(Boolean),
  }
}