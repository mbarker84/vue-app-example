<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.name">
        <td>{{ item.name }}</td>
        <td class="cell">
          <span>{{ item.score }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { selectAll } from "d3-selection";
import { scaleLinear } from "d3-scale";

export default defineComponent({
  props: {
    data: Array,
  },

  setup(props) {
    const { data } = props;

    const colorScale = scaleLinear(
      [0, 4, 8, 10],
      [
        "hsl(174 72.1% 56.5% / 0.25)",
        "hsl(174 72.1% 56.5% / 0.5)",
        "hsl(174 72.1% 56.5% / 0.75)",
        "hsl(174 72.1% 56.5%)",
      ]
    );

    onMounted(() => {
      selectAll(".cell")
        .data(data)
        .append("div")
        .attr("class", "d3-circle")
        .style("background-color", (d) => colorScale(d.score));
    });

    return { data };
  },
});
</script>
