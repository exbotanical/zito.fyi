import React from 'react';
import styled from 'styled-components';

import { BREAKPOINTS } from '@/theme/constants';
import { PostCard } from '@/components/PostCard';
import { LayoutWidthContainer } from '@/components//LayoutWidthContainer';

import type { IFeedItems } from '@/types';

interface IFeedProps {
	feedItems: IFeedItems;
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

export const Feed = ({ feedItems, hideHero }: IFeedProps): JSX.Element => (
	<WidthLimitedGrid>
		<Wrapper>
			{feedItems.map((feedItem, idx) => {
				// it may be a placeholder post
				if ('isPlaceholder' in feedItem) {
					return <PostCard key={feedItem.key} />;
				}

				return idx === 0 && !hideHero ?
					(
						<PostCard key={feedItem.slug} post={feedItem} hero />
					) :
					(
						<PostCard key={feedItem.slug} post={feedItem} />
					);
			})}
		</Wrapper>
	</WidthLimitedGrid>
);
