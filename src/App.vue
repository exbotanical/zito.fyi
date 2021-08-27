<script setup>
import {
	computed,
	watch,
	onMounted
} from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

import {
	useActions,
	useGetters
} from '@/hooks';

/* Components */
import MainLayout from '@/layout/MainLayout.vue';

/* Est */
const route = useRoute();

const { addViewToCache } =
  useActions('config', [
  	'addViewToCache'
  ]);

const { getCachedViews, appName } =
  useGetters('config', [
  	'getCachedViews',
		'appName'
  ]);

/* Watchers */
watch(
	() => route.name,
	() => addViewToCache(route)
);

/* Init */
useHead({
	title: appName,
	meta: [
		{
			name: `description`,
			content: computed(() => route.meta.desc)
		}
	]
});

onMounted(() => {
	addViewToCache(route);
});
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
MainLayout
  router-view(v-slot="{ Component }")
    keep-alive(:include="getCachedViews")
      component(:is="Component")
</template>
