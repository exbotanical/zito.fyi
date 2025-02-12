import type { ImageDataLike } from 'gatsby-plugin-image'

export interface UserQueryResult {
  site: {
    siteMetadata: {
      config: {
        user: UserMetadata
      }
    }
  }
}

export interface PostBySlugQueryResult {
  mdx?: MdxNode
}

export interface MdxNode {
  body?: string

  fields?: {
    slug?: string
    pathName?: string
    route?: string
    url?: string
  }

  timeToRead?: {
    text?: string
  }

  frontmatter?: {
    title?: string
    description?: string
    cover?: {
      publicURL?: string
      childImageSharp?: { gatsbyImageData: ImageDataLike }
    }
    coverAlt?: string
    category?: string
    tags?: readonly (string | undefined)[]
    datePublished?: string
    dateModified?: string
  }

  internal?: {
    content?: string
    contentFilePath?: string
  }
}

export interface Post {
  title: string
  description?: string
  coverImg?: ImageDataLike
  coverImageUrl?: string
  coverImageAlt: string
  datePublished: Date
  dateModified: Date
  category?: string
  tags?: string[]
  body?: string
  timeToRead: string
  internalContent?: string
  contentFilePath?: string
  slug: string
  route: string
  pathName: string
  url: string
  relatedPosts?: Post[]
}

export interface PostJson {
  title: string
  description?: string
  coverImg: ImageDataLike
  coverImageUrl?: string
  coverImageAlt: string
  datePublished: string
  dateModified: string
  category?: string
  tags?: string[]
  timeToRead: string
  slug: string
  route: string
  pathName: string
  url: string
  relatedPosts?: PostJson[]
}

export interface FeedMetadata {
  current: number
  next?: number
  nextCount?: number
  prev?: number
  prevCount?: number
  posts: Post[]
}

export interface FeedMetadataJson {
  current: number
  next?: number
  nextCount?: number
  prev?: number
  prevCount?: number
  posts: PostJson[]
}

export interface PlaceholderPost {
  isPlaceholder: boolean
  key: string
}

export type FeedItems = (PlaceholderPost | Post)[]

export interface BaseSiteMetadata {
  title: string
  titleAbridged: string
  name: string
  description: string
  language: string
  logoUrl: string
  facebookAppId?: string
  twitterHandle?: string // TODO restrict to only UserMetadata
  url: string
  copyright: {
    name: string
    link: string
  }
  rss: string
  rssTitle: string
  googleAnalyticsId?: string
  disqusShortname?: string
  themeColor: string
  backgroundColor: string
}

export interface UserMetadata {
  id: string
  firstName: string
  surname: string
  twitterHandle?: string
  youtubeUrl?: string
  linkedIn?: string
  github?: string
  email: string
  location: string
  about: string
  avatar: string
}

export interface OrgMetadata {
  name: string
  description: string
  logoUrl: string
  url: string
}

interface IconManifest {
  src: string
  sizes: string
  type: string
  purpose?: string
}

export interface SiteConfig {
  site: BaseSiteMetadata
  user: UserMetadata
  organization: OrgMetadata
  pathPrefix: string
  contentDir?: string
  assetDir?: string
  embeddedImageWidth: number
  embeddedVideoWidth: number
  iconPath?: string
  iconList: Readonly<IconManifest[]>
  iconCachePaths?: string[]
  basePath?: string
}

export interface QueryAllPostsResult {
  allMdx: {
    edges: { node: MdxNode }[]
  }
}
