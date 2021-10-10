import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

import { useConfig } from '@/config';
import type { IPost } from '@/types';

interface IDisqusPluginProps {
	post: IPost;
}

export const DisqusPlugin = ({
	post
}: IDisqusPluginProps): JSX.Element | null => {
	const config = useConfig();

	if (!config.site.disqusShortname) {
		return null;
	}

	const { url, title } = post;

	return (
		<Disqus
			config={{
				url,
				identifier: title,
				title
			}}
		/>
	);
};
