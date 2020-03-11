const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---packages-gatsby-theme-docs-src-templates-docs-page-template-js": hot(preferDefault(require("/home/art/Desktop/JSandFriends/Gatsby-with-JasonL/gatsby-advanced/packages/gatsby-theme-docs/src/templates/docs-page-template.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/art/Desktop/JSandFriends/Gatsby-with-JasonL/gatsby-advanced/sites/theme-dev/.cache/dev-404-page.js")))
}

