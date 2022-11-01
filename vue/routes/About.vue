<template>
  <div class="container">
    <h1>About</h1>
    <p>This is the About page</p>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { select } from "d3-selection";

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log("About page");

      select("p").append("div").attr("class", "d3-circle");
    });
  },
});
</script>
