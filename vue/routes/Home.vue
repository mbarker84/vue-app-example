<template>
  <div class="container">
    <h1>Home</h1>
    <div class="grid">
      <component :is="TestComponent" :data="data">
        <KPI :data="data" color="turquoise"></KPI>
      </component>
      <WidgetLoader
        url="https://api.npoint.io/01264aa2a713715ccc1e"
        v-slot="slotProps"
      >
        <KPI :data="slotProps.data" color="turquoise"></KPI>
      </WidgetLoader>
      <WidgetLoader
        url="https://api.npoint.io/ea45973ff614bdbc7ed1"
        v-slot="slotProps"
      >
        <KPI :data="slotProps.data" color="turquoise"></KPI>
      </WidgetLoader>
      <WidgetLoader
        url="https://api.npoint.io/8d900f8ba26cba4acce7"
        v-slot="slotProps"
      >
        <KPI :data="slotProps.data" color="turquoise"></KPI>
      </WidgetLoader>
      <WidgetLoader
        url="https://api.npoint.io/04459c847fdd2a1d84e3"
        v-slot="slotProps"
      >
        <DataTable :items="slotProps.data"></DataTable>
      </WidgetLoader>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from "vue";
import DataTable from "../components/DataTable";
import KPI from "../components/KPI";
import WidgetLoader from "../components/WidgetLoader";
import Loader from "../components/Loader";
import Error from "../components/Error";

export default defineComponent({
  components: {
    DataTable,
    KPI,
    WidgetLoader,
    // AsyncTest: () => import("../components/AsyncTest.vue"),
    Loader,
    Error,
  },

  setup() {
    const data = ref(null);

    const fetchAndLoad = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/01264aa2a713715ccc1e"
        );
        data.value = await response.json();
      } catch (e) {
        console.error(e);
      }
    };

    const loaderFn = () => {
      return fetchAndLoad().then(() => import("../components/AsyncTest.vue"));
    };

    const TestComponent = defineAsyncComponent({
      loader: loaderFn,
      loadingComponent: Loader,
      errorComponent: Error,
      delay: 1000,
      timeout: 4000,
    });

    return { TestComponent, data };
  },
});
</script>
