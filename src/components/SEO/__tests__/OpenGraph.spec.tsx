import { OpenGraphTags } from '../OpenGraph'

import { tagListHasEmptyValues, seoData, tagListHasUniqueKeys } from './utils'

describe('`OpenGraphTags`', () => {
  it('generates correct tags for pages', () => {
    const generatedTags = OpenGraphTags({
      seoData: seoData.seoSite,
      siteData: seoData.site,
      userData: seoData.user,
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('generates correct tags for posts', () => {
    const generatedTags = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('generates correct tags when missing `description`', () => {
    const generatedTags = OpenGraphTags({
      seoData: { ...seoData.seoPost, description: undefined },
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('generates correct tags when missing user data', () => {
    const generatedTags = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: seoData.site,
      userData: undefined,
      postData: seoData.post,
    })

    expect(generatedTags).toMatchSnapshot()
  })

  it('does not generate tags when missing SEO `imageUrl`', () => {
    const generatedTags = OpenGraphTags({
      seoData: { ...seoData.seoPost, imageUrl: undefined },
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(generatedTags).toStrictEqual([])
  })

  it('does not generate empty tags', () => {
    const generatedSiteTags = OpenGraphTags({
      seoData: seoData.seoSite,
      siteData: seoData.site,
      userData: seoData.user,
    })

    expect(tagListHasEmptyValues(generatedSiteTags)).toBe(false)

    const generatedPostTags = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(tagListHasEmptyValues(generatedPostTags)).toBe(false)

    const generatePostTagsSansFbAppId = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: { ...seoData.site, facebookAppId: undefined },
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(tagListHasEmptyValues(generatePostTagsSansFbAppId)).toBe(false)

    const generatedPostTagsSansDescription = OpenGraphTags({
      seoData: { ...seoData.seoPost, description: undefined },
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(tagListHasEmptyValues(generatedPostTagsSansDescription)).toBe(false)

    const generatedTagsWithoutUserData = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: seoData.site,
      userData: undefined,
      postData: seoData.post,
    })

    expect(tagListHasEmptyValues(generatedTagsWithoutUserData)).toBe(false)
  })

  it('generates unique keys', () => {
    const generatedSiteTags = OpenGraphTags({
      seoData: seoData.seoSite,
      siteData: seoData.site,
      userData: seoData.user,
    })

    expect(tagListHasUniqueKeys(generatedSiteTags)).toBe(true)

    const generatedPostTags = OpenGraphTags({
      seoData: seoData.seoPost,
      siteData: seoData.site,
      userData: seoData.user,
      postData: seoData.post,
    })

    expect(tagListHasUniqueKeys(generatedPostTags)).toBe(true)
  })
})
