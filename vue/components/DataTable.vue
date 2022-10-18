<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.first_name }}</td>
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
    items: Array,
  },

  setup(props) {
    const { items } = props;

    const colorScale = scaleLinear(
      [0, 4, 8, 10],
      ["purple", "darkviolet", "hotpink", "deeppink"]
    );

    onMounted(() => {
      selectAll(".cell")
        .data(items)
        .append("div")
        .attr("class", "d3-square")
        .style("background-color", (d) => colorScale(d.score));
    });

    return { items };
  },
});
</script>
