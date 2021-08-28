<script setup>
import { computed } from 'vue';

const props = defineProps({
	prefix: {
		type: String,
		default: 'icon'
	},
	name: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: '#000'
	}
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
svg(
  aria-hidden="true",
  width="100%",
  height="2.5vh"
)
  use(:xlink:href="symbolId" :fill="color")
</template>
