/**
 * Feed queries
 */
export const allPostsQuery = `query AllPostsList($skip: Int, $limit: Int) {
  allMdx(
    sort: {frontmatter: {datePublished: DESC}}
    limit: $limit
    skip: $skip
    filter: {isNotPublishedYet: {eq: false}}
  ) {
    edges {
      node {
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
          contentFilePath
        }
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
}`
// @todo finalize
export const allPostsByTagQuery = `query AllPostsByTag($tag: String) {
  allMdx(
    limit: 1000
    sort: {frontmatter: {datePublished: DESC}}
    filter: {isNotPublishedYet: {eq: false}, frontmatter: {tags: {in: [$tag]}}}
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
          timeToRead {
            text
          }
        }
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
}`

export const allPostsByCategoryQuery = `query AllPostsByCategory($category: String) {
  allMdx(
    limit: 1000
    sort: {frontmatter: {datePublished: DESC}}
    filter: {isNotPublishedYet: {eq: false}, frontmatter: {category: {eq: $category}}}
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
          timeToRead {
            text
          }
        }
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
}`
