<template>
  <div class="container">
    <h1>Locations</h1>
    <MapView></MapView>
    <CacheWidget
      :url="mapComponent.url"
      :importFunction="mapComponent.importFunction"
    ></CacheWidget>
    <!-- <WidgetLoader
      :url="mapComponent.url"
      :importFunction="mapComponent.importFunction"
    ></WidgetLoader> -->
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
    const mapComponent = {
      url: "https://api.npoint.io/ec46e59905dc0011b7f4",
      importFunction: () => import("../components/MapView.vue"),
    };

    return { mapComponent };
  },
});
</script>
