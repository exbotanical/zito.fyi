export interface GetMdxPostsQueryResult {
  allMdx: {
    edges: {
      node: {
        fields?: { slug?: string }
        frontmatter?: {
          title?: string
          category?: string
          tags?: string[]
          datePublished?: string
        }
      }
    }[]
  }
}

export interface BaseFrontmatter {
  title?: string
  slug?: string
}

export interface RssFeedMetadata {
  site_url?: string
  feed_url?: string
  title?: string
  description?: string
  image_url?: string
  copyright?: string
  generator?: string
}

export interface RssFeedQueryResult {
  siteMetadata?: {
    rssMetadata?: RssFeedMetadata
  }
}

export interface MdxFeedQueryResult {
  edges?: [
    {
      node: {
        html?: string
        timeToRead?: {
          text?: string
        }
        fields?: {
          slug?: string
        }
        frontmatter?: {
          title?: string
          description?: string
          cover?: string
          datePublished?: string
          category?: string
          tags?: string
        }
      }
    },
  ]
}

export interface FeedQueryResult {
  site?: RssFeedQueryResult
  allMdx?: MdxFeedQueryResult
}

export interface FeedConfig {
  serialize: (
    data: FeedPluginData,
  ) => (FeedPluginItem | undefined)[] | undefined
  query: string
  output: string
  title: string
  site_url: string
}

export interface FeedPluginData {
  generator: string
  query: FeedQueryResult
  feeds: FeedConfig[]
  plugins: []
  output: string
  title: string
  site_url: string
}

export interface FeedPluginItem {
  categories?: string
  date?: string
  title?: string
  description?: string
  url?: string
  guid?: string
  custom_elements: [{ 'content:encoded'?: string }, { author?: string }]
}
