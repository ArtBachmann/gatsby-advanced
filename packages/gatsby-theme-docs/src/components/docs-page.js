import React from 'react'
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
      <p>This page was updated: {page.updated}</p>
    </Layout>
  )
}

export default DocsPage
