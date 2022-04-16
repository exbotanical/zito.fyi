import {
  getAuthorMetadata,
  getOrgMetadata,
  getPostMetadata,
  RichSearchTags
} from '../RichSearch'

import { tagListHasEmptyValues, seoData, containsEmptyValues } from './utils'

describe('seo module RichSearchTags', () => {
  it('generates correct tags for pages', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoSite,
      userData: seoData.user,
      orgData: seoData.organization
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('generates correct tags for posts', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: seoData.user,
      orgData: seoData.organization
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('does not generate tags when missing post `coverImageUrl`', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: { ...seoData.post, coverImageUrl: undefined },
      userData: seoData.user,
      orgData: seoData.organization
    })
    expect(generatedTags).toStrictEqual([])
  })

  it('does not generate tags when missing post `description`', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: { ...seoData.post, description: undefined },
      userData: seoData.user,
      orgData: seoData.organization
    })

    expect(generatedTags).toStrictEqual([])
  })

  it('generates correct tags when missing user metadata', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: undefined,
      orgData: seoData.organization
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('generates correct tags when missing org data', () => {
    const generatedTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: seoData.user,
      orgData: undefined
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('does not generate empty tags', () => {
    const generatedSiteTags = RichSearchTags({
      seoData: seoData.seoSite,
      userData: seoData.user,
      orgData: seoData.organization
    })

    expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false)

    const generatedPostTags = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: seoData.user,
      orgData: seoData.organization
    })

    expect(tagListHasEmptyValues(generatedPostTags)).toBe(false)

    const generatedPostTagsWithoutUserData = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: undefined,
      orgData: seoData.organization
    })

    expect(tagListHasEmptyValues(generatedPostTagsWithoutUserData)).toBe(false)

    const generatedTagsWithoutOrgData = RichSearchTags({
      seoData: seoData.seoPost,
      postData: seoData.post,
      userData: seoData.user,
      orgData: undefined
    })

    expect(tagListHasEmptyValues(generatedTagsWithoutOrgData)).toBe(false)
  })
})

describe('`RichSearchTags` utility `getAuthorMetadata`', () => {
  it('generates valid JSONLD', () => {
    const generatedTags = getAuthorMetadata(seoData.user)

    expect(containsEmptyValues(generatedTags)).toBe(false)

    expect(() => JSON.stringify(generatedTags)).not.toThrow(Error)
  })
})

describe('`RichSearchTags` utility `getOrgMetadata`', () => {
  it('generates valid JSON+LD', () => {
    const generatedTags = getOrgMetadata(seoData.organization)

    expect(containsEmptyValues(generatedTags)).toBe(false)

    expect(() => JSON.stringify(generatedTags)).not.toThrow(Error)
  })
})

describe('`RichSearchTags` utility `getPostMetadata`', () => {
  it('generates valid JSONLD', () => {
    const generatedTags = getPostMetadata(
      seoData.post,
      seoData.organization,
      seoData.user
    )

    expect(containsEmptyValues(generatedTags)).toBe(false)

    expect(() => JSON.stringify(generatedTags)).not.toThrow(Error)
  })
})
