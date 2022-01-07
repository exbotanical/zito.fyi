import { Disqus } from 'gatsby-plugin-disqus';
import React from 'react';

import type { Post } from '@/types';

import { useConfig } from '@/config';

interface DisqusPluginProps {
	post: Post;
}

export function DisqusPlugin({ post }: DisqusPluginProps): JSX.Element | null {
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
