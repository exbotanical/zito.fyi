import React from 'react';
import { Helmet } from 'react-helmet';

import type { IPost } from '@/types';

import { GeneralTags } from '@/components/SEO/General';
import { OpenGraphTags } from '@/components/SEO/OpenGraph';
import { RichSearchTags } from '@/components/SEO/RichSearch';
import { TwitterTags } from '@/components/SEO/Twitter';
import { generatePostData, generateSeoData } from '@/components/SEO/utils';
import { useConfig } from '@/config';

interface ISeoProps {
	post?: IPost;
}

export function SEO({ post }: ISeoProps): JSX.Element {
	const config = useConfig();

	const postData = post ? generatePostData(post) : undefined;
	const seoData = generateSeoData(config.site, postData);

	const siteData = config.site;
	const userData = config.user;
	const orgData = config.organization;

	const tagList = [
		...GeneralTags(seoData, config.site),
		...OpenGraphTags({
			postData,
			seoData,
			siteData,
			userData
		}),
		...RichSearchTags({
			orgData,
			postData,
			seoData,
			userData
		}),
		...TwitterTags({
			seoData,
			siteData,
			userData
		})
	];

	return (
		<Helmet
			htmlAttributes={{
				lang: siteData.language
			}}
		>
			{tagList}
		</Helmet>
	);
}
