<script setup>
import { not, objNotEmptyDeep } from 'js-heuristics';

import { dateConv } from '@/utils';

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: true
	},
	createdAt: {
		type: [Date, String],
		required: true
	},
	slug: {
		type: String,
		required: true
	}
});

// if any of the props are null or undefined, trigger error boundary
if (not(objNotEmptyDeep(props))) {
	throw new Error('Rendering error');
}
</script>
<!-- jillybean -->
<template lang="pug">
<!-- /* eslint-disable */ -->
router-link(
  v-slot="{ navigate }"
  :to="`/${slug}`"
  custom
)
  li.post(
    @click="navigate"
  )
    p {{ title }}
    p {{ subtitle}}
    time {{ dateConv(createdAt) }}
</template>
