<template>
  <div class="error">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    errorMessage: String,
  },

  setup(props) {
    const { errorMessage } = props;
    return { errorMessage };
  },
});
</script>
