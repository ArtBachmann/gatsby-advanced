const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const withDefaults = require('./utils/default-options')


exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState()
  // get options with defaults
  const { contentPath } = withDefaults(options)
  // figure out the content path
  const dir = path.join(program.directory, contentPath)
  // if directory doesn't exist, create it..
  if (!fs.existsSync(dir)) {
    // create the dir
    mkdirp.sync(dir)
  }
}

// Schema customization..
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
      id: ID!
      title: String!
      path: String!
      updated: Date! @dateformat
      body: String!
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefaults(options)  // path for the Docs page..
  const parent = getNode(node.parent)

  // only work on MDX files that were loaded by this theme.
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return
  }

  // Treat 'index.mdx like 'index.html' 'docs/' vs 'docs/index/ '
  const pageName = parent.name !== 'index' ? parent.name : '' //if is 'index' leave blank...

  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    }
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the 'Mdx' type 'body' field..
          const type = info.schema.getType('Mdx')
          const mdxFields = type.getFields()
          const resolver = mdxFields.body.resolve

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent })

          return resolver(mdxNode, args, context, {
            fieldName: 'body'
          })
        }
      }
    }
  })
}