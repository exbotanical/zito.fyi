import type React from 'react'

export interface SeoData {
  isPost: boolean
  type: 'page' | 'post'
  title: string
  imageUrl?: string
  imageAlt: string
  url: string
  description?: string
}

export interface AbridgedPost {
  title: string
  description?: string
  coverImageUrl?: string
  coverImageAlt: string
  datePublished: Date
  dateModified: Date
  category: string
  tags: string[]
  body: string
  url: string
}

export interface JsonLdAuthorMetadata {
  '@type': 'Person'
  'givenName': string
  'familyName': string
  'email': string
  'address': string
}

export interface JsonLdOrgMetadata {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  'url': string
  'name': string
  'description': string
  'logo': string
}

export interface JsonLdPostMetadata {
  '@context': 'http://schema.org'
  '@type': 'BlogPosting'
  'mainEntityOfPage': 'True'
  'image': string
  'url': string
  'headline': string
  'name': string
  'description': string
  'dateCreated': Date
  'datePublished': Date
  'dateModified': Date
  'author'?: JsonLdAuthorMetadata
  'creator'?: JsonLdAuthorMetadata
  'publisher'?: JsonLdOrgMetadata
  'keywords': string[]
  'articleSection': string
  'articleBody': string
}

export type TwitterTagList = React.ReactElement<
  { name: string; content: string },
  'meta'
>[]

export type OpenGraphTagList = React.ReactElement<
  { property: string; content: string },
  'meta'
>[]

export type RichSearchTag = React.ReactElement<
  { key: 'rich-search'; type: 'application/ld+json' },
  'script'
>
