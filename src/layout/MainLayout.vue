<script setup>
/* Components */
import MainHeader from '@/layout/MainHeader.vue';
import MainFooter from '@/layout/MainFooter.vue';
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
MainHeader
main
  slot
MainFooter
</template>

<style lang="scss" >
// must exist for injection of root stylesheet
</style>
