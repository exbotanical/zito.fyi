import { graphql } from 'gatsby'

import { PostTemplate } from '.'

const TemplateComponent = PostTemplate

export const PostTemplateQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body

      frontmatter {
        title
        description
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
        coverAlt
        datePublished
        dateModified
        category
        tags
      }
      fields {
        slug
        route
        pathName
        url
        timeToRead {
          text
        }
      }
      internal {
        content
      }
    }
  }
`

export default TemplateComponent
