<script setup>
/* Components */
import MainHeader from '@/layout/MainHeader.vue';
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
MainHeader
main
  slot
</template>

<style lang="scss" >
// must exist for injection of root stylesheet
</style>
