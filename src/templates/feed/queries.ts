/**
 * Feed queries
 */

export const allPostsQuery = `#graphql
query AllPostsList($skip: Int, $limit: Int) {
  allMdx(
    sort: { fields: [frontmatter___datePublished], order: DESC }
    limit: $limit
    skip: $skip,
    filter: { isNotPublishedYet: { eq: false } }
  ) {
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
        }
        timeToRead
        frontmatter {
          title
          description
          cover {
            childImageSharp {
              gatsbyImageData(height: 368)
            }
          }
          coverAlt
          tags
          category
          datePublished
          dateModified
        }
      }
    }
  }
}
`
// @todo finalize
export const allPostsByTagQuery = `#graphql
query AllPostsByTag($tag: String) {
  allMdx(
    limit: 1000
    sort: { fields: [frontmatter___datePublished], order: DESC }
    filter: { isNotPublishedYet: { eq: false }, frontmatter: { tags: { in: [$tag] } } }
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
        }
        timeToRead
        frontmatter {
          title
          tags
          category
          cover {
            childImageSharp {
              gatsbyImageData(height: 368)
            }
          }
          coverAlt
          datePublished
          dateModified
          description
        }
      }
    }
  }
}
`

export const allPostsByCategoryQuery = `#graphql
query AllPostsByCategory($category: String) {
  allMdx(
    limit: 1000
    sort: { fields: [frontmatter___datePublished], order: DESC }
    filter: { isNotPublishedYet: { eq: false }, frontmatter: { category: { eq: $category } } }
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
        }
        timeToRead
        frontmatter {
          title
          tags
          category
          cover {
            childImageSharp {
              gatsbyImageData(height: 368)
            }
          }
          coverAlt
          datePublished
          dateModified
          description
        }
      }
    }
  }
}
`
