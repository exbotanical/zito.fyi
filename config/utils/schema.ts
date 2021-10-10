export const ConfigSchema = `#graphql
  type ISiteMetadata {
    title: String!
    titleAbridged: String!
    name: String!
    description: String!
    language: String!
    logoUrl: String!
    facebookAppId: String
    twitterHandle: String
    url: String!
    copyright: String!
    rss: String!
    rssTitle: String!
    googleAnalyticsId: String
    disqusShortname: String
    themeColor: String!
    backgroundColor: String!
  }

  type IUserMetadata {
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

  type IOrgMetadata {
    name: String!
    description: String!
    logoUrl: String!
    url: String!
  }

  type IIconManifest {
    src: String!
    sizes: String!
    type: String!
    purpose: String
  }

  type ISiteConfig {
    site: ISiteMetadata!
    user: IUserMetadata
    organization: IOrgMetadata

    pathPrefix: String!

    contentDir: String
    assetDir: String

    embeddedImageWidth: Int!
    embeddedVideoWidth: Int!

    iconPath: String
    iconList: [IIconManifest]!
    iconCachePaths: [String]

    basePath: String
  }

  type SiteSiteMetadata {
    config: ISiteConfig!
  }
`;
