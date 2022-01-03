import {
	allPostsByCategoryQuery,
	allPostsByTagQuery,
	allPostsQuery
} from '../../src/templates/feed/queries';
import { mdxNodeToPost } from '../../src/utils';

import type { IQueryAllPostsResult, IPost } from '../../src/types';

interface IQueryResult {
	errors?: string[];
	data?: IQueryAllPostsResult;
}

type GraphqlType = <TData, TVariables = any>(
	query: string,
	variables?: TVariables
) => Promise<{
	errors?: string[];
	data?: TData;
}>;

export const getAllPostsByTag = async (
	graphql: GraphqlType,
	tag: string
): Promise<IPost[]> => {
	const tagQueryResult = await graphql<IQueryAllPostsResult>(
		allPostsByTagQuery,
		{
			tag
		}
	);

	return processQueryResult(tagQueryResult);
};

export async function getAllPostsByCategory (
	graphql: GraphqlType,
	category: string
): Promise<IPost[]> {
	const categoryQueryResult = await graphql<IQueryAllPostsResult>(
		allPostsByCategoryQuery,
		{ category }
	);

	return processQueryResult(categoryQueryResult);
}

export const resolveAllPostsFromQuery = (
	allPosts: IQueryAllPostsResult
): IPost[] => {
	const { edges } = allPosts.allMdx;

	const nodes = edges.map((edge) => edge.node);

	return nodes.map((node) => mdxNodeToPost(node));
};

const processQueryResult = (
	result: IQueryResult
): ReturnType<typeof resolveAllPostsFromQuery> => {
	if (result.errors) {
		console.error(
			'[processQueryResult] Error while processing query results. See:'
		);

		console.error(result.errors);

		// @ts-expect-error serialize array of error strings
		throw Error(result.errors);
	}

	if (!result.data) {
		console.warn('[processQueryResult]: No data returned by query');
		return [];
	}

	return resolveAllPostsFromQuery(result.data);
};

export const getAllPosts = async (graphql: GraphqlType): Promise<IPost[]> => {
	const indexQueryResult = await graphql<IQueryAllPostsResult>(allPostsQuery);

	return processQueryResult(indexQueryResult);
};
