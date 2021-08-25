<script setup>
import { defineProps, computed } from 'vue';

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
svg(aria-hidden="true",width="100%",height="40px")
  use(:xlink:href="symbolId" :fill="color")
</template>
