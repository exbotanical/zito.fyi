<script setup>
import {
  watch,
  onMounted,
  ref,
  reactive
} from 'vue';
import { useRoute } from 'vue-router';

import {
  useActions,
  useGetters,
  useNetwork
} from '@/hooks';

/* Est */
const route = useRoute();
const { handleConn } = reactive(useNetwork());

const { addNotification } =
  useActions('notifications', [
    'addNotification'
  ]);

const { addViewToCache } =
  useActions('config', [
    'addViewToCache'
  ]);

const { getCachedViews } =
  useGetters('config', [
    'getCachedViews'
  ]);

/* Data */
const num = 3;
const id = Math.floor(Math.random() * num) + 1;

const imageRef = ref(null);

/* Methods */
function closeAnnoyingImg () {
  imageRef.value.style.display = 'none';
}

/* Watchers */
watch(
  () => route.name,
  () => addViewToCache(route)
);

// handle online / offline
handleConn(() => {
  addNotification({
    type: 'error',
    message: 'It seems your network connection has dropped...'
  });
}, () => {
  addNotification({
    type: 'success',
    message: 'Your network connection has been restored'
  });
});

/* Init */
onMounted(() => {
  addViewToCache(route);
});
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
router-view(v-slot="{ Component }")
  transition(name="fade" mode="out-in")
    keep-alive(:include="getCachedViews")
      component(:is="Component")
img.img__overlay(
  :src="`/rand/m${id}.gif`"
  @click="closeAnnoyingImg"
  ref="imageRef"
  alt="randomized overlay image"
)
</template>

<style lang="scss" scoped>
.img__overlay {
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: 0;
  max-height: 150px;

  &:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: $main-mobile-and-tablet) {
  .img__overlay {
    max-height: 75px;
  }
}
</style>
