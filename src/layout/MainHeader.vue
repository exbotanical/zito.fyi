<script setup>
import { useRoute } from "vue-router";

import { useGetters } from '@/hooks';

import Prompt from "@/components/fragments/Prompt.vue";

const route = useRoute();

const { appName } = useGetters('config', [
	'appName'
]);
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
header
	span(style="position:fixed")
		Prompt
			router-link(to="/")
				strong(v-if="route.path !== '/'") cd ..
				strong(v-else) {{ appName }}
</template>
