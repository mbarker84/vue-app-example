<template>
  <div class="kpi">
    <h2 class="kpi__title">
      <span class="kpi__name">{{ title }}</span>
      <span class="kpi__value"
        >{{ value }}<span class="kpi__unit">{{ unit }}</span></span
      >
    </h2>
    <figure>
      <LineGraph :data="lineGraphData" :color="color"></LineGraph>
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
    const { title, value, unit } = data;
    const lineGraphData = data.data;

    return { title, value, unit, data, lineGraphData, color };
  },
});
</script>
