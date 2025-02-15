import { Disqus } from 'gatsby-plugin-disqus'
import React from 'react'

import { useConfig } from '@/config'
import type { Post } from '@/types'

interface DisqusPluginProps {
  readonly post: Post
}

export function DisqusPlugin({
  post,
}: DisqusPluginProps): React.JSX.Element | null {
  const config = useConfig()

  if (!config.site.disqusShortname) {
    return null
  }

  const { url, title } = post

  return (
    <Disqus
      config={{
        identifier: title,
        title,
        url,
      }}
    />
  )
}
