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
	.main
		h1.main-title {{ title }}
		h2.main-subtitle {{ subtitle  }}
		time {{ dateHeader }}
	slot
	time {{ dateFooter }}
</template>

<style lang="scss" scoped>

.main {
  padding-bottom: 9rem;
  transform: skewY(-9deg);

  &-title {
    color: $main-accent-color;
  }

  &-subtitle {
    margin: 1rem 0;
    color: $main-secondary-color;
    // margin-bottom: 9rem;
  }
}

time {
  float: right;
}
</style>
