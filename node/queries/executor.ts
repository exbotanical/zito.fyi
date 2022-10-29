import {
  allPostsByCategoryQuery,
  allPostsByTagQuery,
  allPostsQuery,
} from '../../src/templates/feed/queries'
import { mdxNodeToPost } from '../../src/utils'

import type { QueryAllPostsResult, Post } from '../../src/types'

interface QueryResult {
  errors?: string[]
  data?: QueryAllPostsResult
}

type GraphqlType = <TData, TVariables = any>(
  query: string,
  variables?: TVariables,
) => Promise<{
  errors?: string[]
  data?: TData
}>

export async function getAllPostsByTag(graphql: GraphqlType, tag: string) {
  const tagQueryResult = await graphql<QueryAllPostsResult>(
    allPostsByTagQuery,
    {
      tag,
    },
  )

  return processQueryResult(tagQueryResult)
}

export async function getAllPostsByCategory(
  graphql: GraphqlType,
  category: string,
): Promise<Post[]> {
  const categoryQueryResult = await graphql<QueryAllPostsResult>(
    allPostsByCategoryQuery,
    { category },
  )

  return processQueryResult(categoryQueryResult)
}

export function resolveAllPostsFromQuery(allPosts: QueryAllPostsResult) {
  const { edges } = allPosts.allMdx
  const nodes = edges.map(edge => edge.node)

  return nodes.map(node => mdxNodeToPost(node))
}

function processQueryResult(result: QueryResult) {
  if (result.errors) {
    console.error(
      '[processQueryResult] Error while processing query results. See:',
    )

    console.error(result.errors)

    // @ts-expect-error serialize array of error strings
    throw Error(result.errors)
  }

  if (!result.data) {
    console.warn('[processQueryResult]: No data returned by query')
    return []
  }

  return resolveAllPostsFromQuery(result.data)
}

export async function getAllPosts(graphql: GraphqlType) {
  const indexQueryResult = await graphql<QueryAllPostsResult>(allPostsQuery, {
    today: new Date(),
  })

  return processQueryResult(indexQueryResult)
}
