/** @jsx jsx */
import { jsx } from 'theme-ui'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from './layout'

const DocsPage = ({ page }) => {
  return (
    <Layout>
      <h3>
        {page.title}
      </h3>
      <MDXRenderer>
        {page.body}
      </MDXRenderer>
      <p
        sx={{
          borderTop: theme => `1px solid ${theme.colors.muted}`,
          color: 'muted',
          fontSize: 14,
          mt: 2,
          pt: 2,
        }}
      >This page was updated: {page.updated}</p>
    </Layout>
  )
}

export default DocsPage
