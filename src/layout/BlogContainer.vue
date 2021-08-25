<script setup>
import {
  defineProps,
  computed
} from 'vue';

import { notNullOrUndefined } from 'js-heuristics';

/* Props */
const props = defineProps({
  frontmatter: {
    type: Object,
    required: true
  }
});
console.log(props.frontmatter);
// const {
//   title,
//   subtitle,
//   imgSrc,
//   createdAt,
//   updatedAt
// } = props.frontmatter;

/* Computed */
const dateHeader = computed(() => {
  return dateConv(createdAt);
});

const dateFooter = computed(() => {
  if (notNullOrUndefined(updatedAt)) {
    const dateF = dateConv(updatedAt);

    return `updated on ${dateF}`;
  }

  return false;
});

/* Methods */
function dateConv (ts) {
  return new Date(ts).toDateString();
}

</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
div
  slot
</template>
