<script setup>
import { useRoute } from "vue-router";

import Prompt from "@/components/fragments/Prompt.vue";

const route = useRoute();
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
header
  span(style="position:fixed")
    Prompt
      router-link(
        v-if="route.path !== '/'"
        to="/"
      )
        strong cd ..
</template>
