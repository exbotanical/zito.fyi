<template lang="pug">
<!-- /* eslint-disable */ -->
.prompt
  .prompt__el
    strong >
  .prompt__el
    strong >
  .prompt__el
    strong(style="margin-right:1rem;") >
  slot
</template>

<style lang="scss" scoped>
$colors:
  $main-warn-color,
  $main-error-color,
  $main-secondary-color;

.prompt {
  display: flex;
  align-items: center;

  @for $i from 1 through length($colors) {
    &__el:nth-child(#{$i}) {
      color: nth($colors, $i);
      font-size: 2rem;
      font-weight: $main-font-weight-bold;
    }
  }
}
</style>
