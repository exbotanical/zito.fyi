import React from 'react'
import { Helmet } from 'react-helmet'

import { Feed } from '@/components/Feed'
import { FeedWrapper } from '@/components/FeedWrapper'
import { Layout } from '@/components/Layout'
import { ScreenReaderH1 } from '@/components/ScreenReader'
import { useConfig } from '@/config'

import { useInfiniteFeed } from './hooks'

import type { PageContext } from './types'

interface FeedTemplateProps {
  readonly pageContext: PageContext
}

function FeedTemplate({ pageContext }: FeedTemplateProps): JSX.Element {
  const { feedItems, feedElementRef } = useInfiniteFeed(pageContext)

  const config = useConfig()

  const hideHero = pageContext.feedType !== 'index'

  /**
   * Override the title; for non-index feeds
   */
  function getTitleOverride() {
    if (pageContext.feedId) {
      if (pageContext.feedType === 'tag') {
        return (
          <Helmet
            title={`Posts tagged as "${pageContext.feedId}" | ${config.site.title}`}
          />
        )
      }

      if (pageContext.feedType === 'category') {
        return (
          <Helmet
            title={`Posts in category "${pageContext.feedId}" | ${config.site.title}`}
          />
        )
      }
    }

    return null
  }

  return (
    <Layout>
      {getTitleOverride()}
      <FeedWrapper ref={feedElementRef}>
        <ScreenReaderH1>Recent Posts</ScreenReaderH1>
        <Feed feedItems={feedItems} hideHero={hideHero} />
      </FeedWrapper>
    </Layout>
  )
}

export default FeedTemplate
