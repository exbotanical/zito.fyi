<script setup>
import { defineProps } from 'vue';
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
    type: Date,
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

<template lang="pug">
<!-- /* eslint-disable */ -->
li.post
  router-link(:to="`/blog/${slug}`") {{ title }}
  p {{ subtitle}}
  time {{ dateConv(createdAt) }}
</template>
