<template>
  <p class="loader">{{ text }}</p>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: "Loading...",
    },
  },

  setup(props) {
    const { text } = props;
    return { text };
  },
});
</script>
