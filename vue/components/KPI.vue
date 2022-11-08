<template>
  <div class="kpi" v-if="data">
    <h2 class="kpi__title">
      <span class="kpi__name">{{ data.title }}</span>
      <span class="kpi__value"
        >{{ data.value }}<span class="kpi__unit">{{ data.unit }}</span></span
      >
    </h2>
    <figure>
      <LineGraph :data="data.data" :color="color"></LineGraph>
    </figure>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LineGraph from "./LineGraph";

export default defineComponent({
  components: {
    LineGraph,
  },

  props: {
    data: Object,
    color: String,
  },

  setup(props) {
    const { data, color } = props;

    return { data, color };
  },
});
</script>
