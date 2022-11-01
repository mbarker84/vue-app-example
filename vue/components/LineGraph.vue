<template>
  <div ref="chart" :style="{ color: color }"></div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { select } from "d3-selection";
import { scaleTime, scaleLinear } from "d3-scale";
import { line, curveBumpX, area } from "d3-shape";
import { extent, max } from "d3-array";

export default defineComponent({
  props: {
    data: Object,
    color: String,
  },

  setup(props) {
    const { data, color } = props;
    const chart = ref(null);
    const wrapper = ref(null);
    const svg = ref(null);

    const dimensions = {
      width: 400,
      height: 150,
    };

    const xAccessor = (d) => new Date(d.date);
    const yAccessor = (d) => d.score;

    const xScale = computed(() => {
      return scaleTime()
        .domain(extent(data, xAccessor))
        .range([0, dimensions.width]);
    });

    const yScale = computed(() => {
      return scaleLinear()
        .domain([0, max(data, yAccessor)])
        .range([dimensions.height, 2])
        .nice();
    });

    const lineGenerator = computed(() => {
      return line()
        .x((d) => xScale.value(xAccessor(d)))
        .y((d) => yScale.value(yAccessor(d)))
        .curve(curveBumpX);
    });

    const areaGenerator = computed(() => {
      return area()
        .x((d) => xScale.value(xAccessor(d)))
        .y1((d) => yScale.value(yAccessor(d)))
        .y0(dimensions.height)
        .curve(curveBumpX);
    });

    onMounted(() => {
      wrapper.value = select(chart.value);

      svg.value = wrapper.value
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

      svg.value
        .append("path")
        .datum(data)
        .attr("d", lineGenerator.value)
        .attr("stroke", "currentColor")
        .attr("stroke-width", 2)
        .attr("fill", "none");

      svg.value
        .append("path")
        .datum(data)
        .attr("d", areaGenerator.value)
        .attr("stroke-width", 0)
        .attr("fill", "currentColor")
        .attr("opacity", 0.3);
    });

    return { data, chart, color };
  },
});
</script>
