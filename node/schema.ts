export const ConfigSchema = `#graphql
  type Copyright {
    name: String!
    link: String!
  }

  type BaseSiteMetadata {
    title: String!
    titleAbridged: String!
    name: String!
    description: String!
    language: String!
    logoUrl: String!
    facebookAppId: String
    twitterHandle: String
    url: String!
    copyright: Copyright!
    rss: String!
    rssTitle: String!
    googleAnalyticsId: String
    disqusShortname: String
    themeColor: String!
    backgroundColor: String!
  }

  type UserMetadata {
    id: String!
    firstName: String!
    surname: String!
    twitterHandle: String
    linkedIn: String
    github: String
    email: String!
    location: String!
    about: String!
    avatar: String!
  }

  type OrgMetadata {
    name: String!
    description: String!
    logoUrl: String!
    url: String!
  }

  type IconManifest {
    src: String!
    sizes: String!
    type: String!
    purpose: String
  }

  type SiteConfig {
    site: BaseSiteMetadata!
    user: UserMetadata
    organization: OrgMetadata
    pathPrefix: String!
    contentDir: String
    assetDir: String
    embeddedImageWidth: Int!
    embeddedVideoWidth: Int!
    iconPath: String
    iconList: [IconManifest]!
    iconCachePaths: [String]
    basePath: String
  }

  type SiteSiteMetadata {
    config: SiteConfig!
  }


  type Mdx implements Node {
    frontmatter: MdxFrontmatter!
  }

  # Make dateModified an optional field
  type MdxFrontmatter {
    datePublished: Date
    dateModified: Date
  }
`
