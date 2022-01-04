import {
	Twitter as TwitterIcon,
	LinkedinSquare as LinkedInIcon,
	FacebookCircle as FacebookIcon,
	Reddit as RedditIcon
} from '@styled-icons/boxicons-logos';
import React, { useState } from 'react';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton
} from 'react-share';

import { LinkCopyNotification } from './LinkCopyNotification';
import * as S from './styles';

import type { IPost, ISiteConfig } from '@/types';

import { Separator } from '@/components/Separator';
import { useConfig } from '@/config';

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

export function PostShare({ post }: IPostShareProps): JSX.Element {
	const { title, excerpt, url } = post;

	const [showLinkNotification, setShowlinkNotification] = useState(false);

	const config = useConfig();

	const relatedtwitterHandles = generateRelatedtwitterHandles(config);

	return (
		<S.Wrapper aria-label="Share on social media">
			<S.LinkWrapper>
				<S.LinkGrid>
					<FacebookShareButton quote={excerpt} url={url}>
						<FacebookIcon size={40} />
					</FacebookShareButton>
					<TwitterShareButton
						related={relatedtwitterHandles}
						title={title}
						url={url}
						via={config.site.name}
					>
						<TwitterIcon size={40} />
					</TwitterShareButton>
					<RedditShareButton title={title} url={url}>
						<RedditIcon size={40} />
					</RedditShareButton>
					<LinkedinShareButton
						source={config.site.name}
						summary={excerpt}
						title={title}
						url={url}
					>
						<LinkedInIcon size={40} />
					</LinkedinShareButton>
					<S.LinkButton
						onClick={() => {
							// eslint-disable-next-line no-void
							void navigator.clipboard.writeText(url);
							setShowlinkNotification(true);
						}}
						size={40}
					/>
					{showLinkNotification && (
						<LinkCopyNotification
							onAnimationEnd={() => {
								setShowlinkNotification(false);
							}}
						/>
					)}
				</S.LinkGrid>
			</S.LinkWrapper>
			<Separator />
		</S.Wrapper>
	);
}
