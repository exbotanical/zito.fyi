import React, { useState } from 'react';

import {
	Twitter as TwitterIcon,
	LinkedinSquare as LinkedInIcon,
	FacebookCircle as FacebookIcon,
	Reddit as RedditIcon
} from '@styled-icons/boxicons-logos';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton
} from 'react-share';

import { LinkCopyNotification } from './LinkCopyNotification';
import * as Styles from './styles';
import { useConfig } from '@/config';
import { Separator } from '@/components/Separator';

import type { IPost, ISiteConfig } from '@/types';

interface IPostShareProps {
	post: IPost;
}

const generateRelatedtwitterHandles = (config: ISiteConfig): string[] => {
	const relatedtwitterHandles = [];

	if (config.user.twitterHandle) {
		relatedtwitterHandles.push(config.user.twitterHandle);
	}

	if (config.site.twitterHandle) {
		relatedtwitterHandles.push(config.site.twitterHandle);
	}

	return relatedtwitterHandles;
};

export const PostShare = ({ post }: IPostShareProps): JSX.Element => {
	const { title, excerpt, url } = post;

	const [showLinkNotification, setShowlinkNotification] = useState(false);

	const config = useConfig();

	const relatedtwitterHandles = generateRelatedtwitterHandles(config);

	return (
		<Styles.Wrapper aria-label="Share on social media">
			<Styles.LinkWrapper>
				<Styles.Label>SHARE</Styles.Label>
				<Styles.LinkGrid>
					<FacebookShareButton url={url} quote={excerpt}>
						<FacebookIcon size={40} />
					</FacebookShareButton>
					<TwitterShareButton
						url={url}
						title={title}
						via={config.site.name}
						related={relatedtwitterHandles}
					>
						<TwitterIcon size={40} />
					</TwitterShareButton>
					<RedditShareButton url={url} title={title}>
						<RedditIcon size={40} />
					</RedditShareButton>
					<LinkedinShareButton
						url={url}
						title={title}
						summary={excerpt}
						source={config.site.name}
					>
						<LinkedInIcon size={40} />
					</LinkedinShareButton>
					<Styles.LinkButton
						size={40}
						onClick={() => {
							// eslint-disable-next-line no-void
							void navigator.clipboard.writeText(url);
							setShowlinkNotification(true);
						}}
					/>
					{showLinkNotification && (
						<LinkCopyNotification
							onAnimationEnd={() => {
								setShowlinkNotification(false);
							}}
						/>
					)}
				</Styles.LinkGrid>
			</Styles.LinkWrapper>
			<Separator />
		</Styles.Wrapper>
	);
};
