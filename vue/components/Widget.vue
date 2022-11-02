<template>
  <div class="widget" :style="{ 'aspect-ratio': loading ? aspectRatio : '' }">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    aspectRatio: {
      type: String,
      default: "5 / 3",
    },
  },

  setup(props) {
    const { aspectRatio } = props;

    return { aspectRatio };
  },
});
</script>
