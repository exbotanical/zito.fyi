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
  excerpt?: string
  timeToRead?: number

  fields?: {
    slug?: string
    pathName?: string
    route?: string
    url?: string
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
  excerpt?: string
  timeToRead: number
  internalContent?: string

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

  excerpt?: string
  timeToRead: number

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
  twitterHandle?: string
  url: string
  copyright: string
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
