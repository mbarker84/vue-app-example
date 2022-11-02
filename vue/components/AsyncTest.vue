<template>
  <div>
    <p>{{ data }}</p>
    <div class="widget" :style="{ 'aspect-ratio': loading ? aspectRatio : '' }">
      <slot :data="data" v-if="data"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: Array,
  },

  setup(props) {
    const data = props.data;

    return { data };
  },
});
</script>
