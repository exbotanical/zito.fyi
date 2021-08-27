import {
	notNullOrUndefined,
	isObject,
	not
} from 'js-heuristics';

import { ref } from 'vue';

import { pipe } from '@/utils';

export {
	useMetadata
};

/**
 * @summary Expose mappings of frontmatter-generated route definitions
 */
function useMetadata (routes) {
	const posts = ref([
		...resolveFrontmatter(routes)
	]);

	return { posts };
}

/**
 * @summary Filters routes containing frontmatter
 * @param {object[]} routes
 * @returns {object[]} object[]
 */
function resolveFrontmatter (routes) {
	return routes
		.map(pipe(each, has))
		.filter(notNullOrUndefined);
}

/* Util */
const model = [
	'createdAt',
	'imgSrc',
	'slug',
	'subtitle',
	'title'
];

/**
 * @summary Parses each route def for `meta.frontmatter`
 * @param {object} route
 * @returns {(object|undefined)} object | undefined
 */
function each ({ meta } = {}) {
	return meta?.frontmatter;
}

/**
 * @summary Evaluates each frontmatter object for coalescence
 * @param {object} frontmatter
 * @returns {(object|null)} object | null
 */
function has (frontmatter) {
	return (isObject(frontmatter) && isCoalescent(frontmatter))
		? frontmatter
		: null;
}

/**
 * @summary Evaluates whether the given prospect is coalescent
 * @param {object} prospect
 */
function isCoalescent (prospect) {
	return not(Object.values(prospect).some(not));
}
