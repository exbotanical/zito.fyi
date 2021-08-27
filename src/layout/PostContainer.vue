<script setup>
import {
	computed,
	ref,
	inject,
	onErrorCaptured
} from 'vue';

import { useHead } from '@vueuse/head';
import { not } from 'js-heuristics';

import { defaultTags } from '@/data/tags.json';
import { ERROR_CAT } from '@/services/api/models';
import { dateConv } from '@/utils';

/* Components */
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';
import BlogPostFallback from '@/components/fallback/BlogPostFallback.vue';

/* Est */
const { event } = inject('$api');

/* Props */
const props = defineProps({
	frontmatter: {
		type: Object,
		required: true
	}
});

const {
	title,
	subtitle,
	imgSrc,
	createdAt,
	updatedAt,
	tags
} = props.frontmatter;

/* Data */
const hasError = ref(false);

/* Computed */
const dateHeader = computed(() => dateConv(createdAt));

const dateFooter = computed(() => {
	if (updatedAt && not(updatedAt === createdAt)) {
		const dateF = dateConv(updatedAt);

		return `updated on ${dateF}`;
	}

	return '';
});

/* A Priori */
useHead({
	title,
	meta: [
		{
			name: `description`,
			content: computed(
				() => {
					const content = tags?.length
						? tags?.join(', ')
						: defaultTags;

					return 'A blog post about ' + content;
				}
			)
		}
	]

});

onErrorCaptured((err, vm, info) => {
	hasError.value = true;

	event.logError({
		category: ERROR_CAT.RUNTIME,
		info: `${err.toString()} ${vm} ${info}`
	});

	return false;
});
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
ErrorBoundary(
  :fallback="BlogPostFallback"
)
  h1 {{ title }}
  h2 {{ subtitle  }}
  time {{ dateHeader }}
  slot
  time {{ dateFooter }}
</template>
