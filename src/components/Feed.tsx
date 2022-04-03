import React from 'react';
import styled from 'styled-components';

import type { FeedItems } from '@/types';

import { LayoutWidthContainer } from '@/components//LayoutWidthContainer';
import { PostCard } from '@/components/PostCard';
import { BREAKPOINTS } from '@/styles/constants';

interface FeedProps {
	feedItems: FeedItems;
	hideHero?: boolean;
}

const Wrapper = styled.div`
	display: grid;
	width: 100%;
	grid-gap: 80px;
	grid-template-columns: 1fr 1fr;

	@media (max-width: ${BREAKPOINTS.lg}) {
		gap: 60px;
		grid-template-columns: 1fr;
	}
`;

const WidthLimitedGrid = styled(LayoutWidthContainer)`
	display: grid;
	align-content: space-between;
	gap: 80px;
	grid-template-columns: 100%;
	justify-items: stretch;
`;

export function Feed({ feedItems, hideHero }: FeedProps): JSX.Element {
	return (
		<WidthLimitedGrid>
			<Wrapper>
				{feedItems.map((feedItem, idx) => {
					// it may be a placeholder post
					if ('isPlaceholder' in feedItem) {
						return <PostCard key={feedItem.key} />;
					}

					return idx === 0 && !hideHero ? (
						<PostCard hero key={feedItem.slug} post={feedItem} />
					) : (
						<PostCard key={feedItem.slug} post={feedItem} />
					);
				})}
			</Wrapper>
		</WidthLimitedGrid>
	);
}
