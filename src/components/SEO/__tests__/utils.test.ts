import cloneDeep from 'lodash.clonedeep'
import removeMd from 'remove-markdown'

import { post as postFixture } from '@@/fixtures'

import { generatePostData, generateSeoData } from '../utils'

import { seoData } from './utils'

describe('sEO utility `generateSeoData`', () => {
  it('generates site SEO metadata', () => {
    const siteData = seoData.site

    const seo = generateSeoData(siteData)

    expect(seo.title).toBe(siteData.title)
    expect(seo.description).toBe(siteData.description)
    expect(seo.url).toBe(siteData.url)
    expect(seo.imageUrl).toBe(siteData.logoUrl)
    expect(seo.imageAlt).toBe(siteData.description)
    expect(seo.type).toBe('page')
    expect(seo.isPost).toBe(false)
  })

  it('generates SEO metadata for posts', () => {
    const postData = seoData.post

    const seo = generateSeoData(seoData.site, postData)

    expect(seo.title).toBe(postData.title)
    expect(seo.description).toBe(postData.description)
    expect(seo.url).toBe(postData.url)
    expect(seo.imageUrl).toBe(postData.coverImageUrl)
    expect(seo.imageAlt).toBe(postData.coverImageAlt)
    expect(seo.type).toBe('post')
    expect(seo.isPost).toBe(true)
  })
})

describe('seo utility `generatePostData`', () => {
  it('generates SEO metadata for posts', () => {
    const post = generatePostData(postFixture)

    expect(post.body).toBe(removeMd(postFixture.internalContent!))
    expect(post.category).toBe(postFixture.category)
    expect(post.coverImageUrl).toBe(postFixture.coverImageUrl)
    expect(post.coverImageAlt).toBe(postFixture.coverImageAlt)
    expect(post.datePublished).toBe(postFixture.datePublished)
    expect(post.dateModified).toBe(postFixture.dateModified)
    expect(post.description).toBe(postFixture.description)
    expect(post.tags).toBe(postFixture.tags)
    expect(post.title).toBe(postFixture.title)
  })

  it('strips markdown formatting from the post content', () => {
    const post = cloneDeep(postFixture)

    post.internalContent = 'Content with [Markdown](/link).'

    const postData = generatePostData(post)

    expect(postData.body).toBe('Content with Markdown.')
  })

  it('falls back to None when no category is available', () => {
    const post = cloneDeep(postFixture)
    post.category = undefined

    const postData = generatePostData(post)

    expect(postData.category).toBe('None')
  })

  it('falls back to an empty list when no tags are available', () => {
    const post = cloneDeep(postFixture)
    post.tags = undefined

    const postData = generatePostData(post)

    expect(postData.tags).toStrictEqual([])
  })

  it('throws when internal content is not available', () => {
    const post = cloneDeep(postFixture)
    post.internalContent = undefined

    const throwingFn = () => generatePostData(post)

    expect(throwingFn).toThrow()
  })
})
