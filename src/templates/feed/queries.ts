/**
 * Feed queries
 */

export const allPostsQuery = `#graphql
query AllPostsList($skip: Int, $limit: Int) {
  allMdx(
    sort: { fields: [frontmatter___datePublished], order: DESC }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        fields {
          slug
          route
          pathName
          url
        }
        excerpt
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
`;

export const allPostsByTagQuery = `#graphql
query AllPostsByTag($tag: String) {
  allMdx(
    limit: 1000
    sort: { fields: [frontmatter___datePublished], order: DESC }
    filter: { frontmatter: { tags: { in: [$tag] } } }
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
        excerpt
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
`;

export const allPostsByCategoryQuery = `#graphql
query AllPostsByCategory($category: String) {
  allMdx(
    limit: 1000
    sort: { fields: [frontmatter___datePublished], order: DESC }
    filter: { frontmatter: { category: { eq: $category } } }
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
        excerpt
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
`;
