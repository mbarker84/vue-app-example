<template>
  <div class="container">
    <h1>Home</h1>
    <div class="grid">
      <!-- <CacheWidget
        v-for="component in components"
        :key="component.url"
        v-bind="component"
      ></CacheWidget> -->
      <WidgetLoader
        v-for="component in components"
        :key="component.url"
        v-bind="component"
      ></WidgetLoader>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CacheWidget from "../components/CacheWidget";
import WidgetLoader from "../components/WidgetLoader";

export default defineComponent({
  components: {
    CacheWidget,
    WidgetLoader,
  },

  setup() {
    const components = [
      {
        url: "https://api.npoint.io/01264aa2a713715ccc1e",
        importFunction: () => import("../components/KPI.vue"),
      },
      {
        url: "https://api.npoint.io/ea45973ff614bdbc7ed1",
        importFunction: () => import("../components/KPI.vue"),
      },
      {
        url: "https://api.npoint.io/8d900f8ba26cba4acce7",
        importFunction: () => import("../components/KPI.vue"),
      },
      {
        url: "https://api.npoint.io/04459c847fdd2a1d84e3",
        importFunction: () => import("../components/DataTable.vue"),
      },
    ];

    return { components };
  },
});
</script>
