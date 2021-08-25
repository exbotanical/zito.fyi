<script setup>
import { inject, onErrorCaptured } from 'vue';

import routes from '@/router/routes/blog.routes';

import { ERROR_CAT } from '@/services/api/models';
import { useMetadata } from '@/hooks';

/* Est */
const { event } = inject('$api');

/* Data */
const { posts } = useMetadata(routes);

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
div {{ posts }}
</template>
