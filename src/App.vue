<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

/* Components */
import MainCacheWrapper from '@/layout/MainCacheWrapper.vue';

/* Est */
const route = useRoute();

useHead({
  title: 'zito.dev',
  meta: [
    {
      name: `description`,
      content: computed(() => route.meta.desc)
    }
  ]
});

</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
MainCacheWrapper
</template>

<style lang="scss">
// must exist for injection of root stylesheet
</style>
