<script setup>
import { inject, onErrorCaptured } from 'vue';

import routes from '@/router/routes/blog.routes';

import { ERROR_CAT } from '@/services/api/models';
import { useMetadata } from '@/hooks';
import { toUnixTs } from '@/utils';

/* Components */
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';
import BlogPostThumbnailFallback from '@/components/fallback/BlogPostThumbnailFallback.vue';
import BlogPostThumbnail from '@/components/BlogPostThumbnail.vue';

/* Est */
const { event } = inject('$api');

/* Data */
const { posts } = useMetadata(routes);

const sortedPosts = posts.value.sort(
	(a, b) => toUnixTs(b.createdAt) - toUnixTs(a.createdAt)
);

onErrorCaptured((err, vm, info) => {
	event.logError({
		category: ERROR_CAT.RUNTIME,
		info: `${err.toString()} ${vm} ${info}`
	});

	return false;
});
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
h2.posts-header Posts
ul.posts
  ErrorBoundary(
    v-for="({ title, subtitle, createdAt, slug }, idx) in posts"
    :key="idx"
    :fallback="BlogPostThumbnailFallback"
  )
    BlogPostThumbnail(
      :title="title"
      :subtitle="subtitle"
      :createdAt="createdAt"
      :slug="slug"
    )
</template>
