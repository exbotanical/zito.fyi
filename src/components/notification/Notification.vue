<script setup>
import {
  defineProps,
  toRefs
} from 'vue';

const props = defineProps({
  current: {
    type: Object
  }
});

const { current } = toRefs(props);

const { message, background, color } = current.value;

</script>

<template lang="pug">
#snackbar.toggled
  | {{ message }}
</template>

<style lang="scss" scoped>
$core-opacity: 1;

@mixin opacity-mob {
  opacity: 1;
}

#snackbar {
  position: fixed;
  z-index: 9999;
  bottom: 2rem;
  min-width: 20rem;
  padding: 1.5rem;
  background: v-bind(background);
  border-radius: 6px;
  color: v-bind(color);
  font-size: $font-md;
  font-weight: 500;
  text-align: center;
  visibility: hidden;

  @media screen and (max-width: $mobile) {
    font-size: $font-sm;
  }

  @media screen and (max-width: ($mobile - 100)) {
    padding: 1rem 2rem;
    font-size: $font-sm;
  }
}

// toggled state is discrete in the case that we may want to trigger display
// by appending / removing this class - for now, we leverage `v-if`
#snackbar.toggled {
  -webkit-animation: fade-in 0.5s, fade-out 0.5s 2.5s;
  animation: fade-in 0.5s, fade-out 0.5s 2.5s;
  opacity: $core-opacity;
  visibility: visible;

  @media screen and (max-width: ($mobile - 100)) {
    opacity: 1;
  }
}

/* Animations */
@-webkit-keyframes fade-in {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include opacity-mob;
    }
  }
}

@keyframes fade-in {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include opacity-mob;
    }
  }
}

@-webkit-keyframes fade-out {
  from {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include opacity-mob;
    }
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fade-out {
  from {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include opacity-mob;
    }
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
