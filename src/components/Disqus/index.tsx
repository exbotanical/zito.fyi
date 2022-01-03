import { Disqus } from 'gatsby-plugin-disqus';
import React from 'react';

import type { IPost } from '@/types';

import { useConfig } from '@/config';

interface IDisqusPluginProps {
	post: IPost;
}

export function DisqusPlugin({
	post
}: IDisqusPluginProps): JSX.Element | null {
	const config = useConfig();

	if (!config.site.disqusShortname) {
		return null;
	}

	const { url, title } = post;

	return (
		<Disqus
			config={{
        identifier: title,
        title,
        url
      }}
		/>
	);
}
