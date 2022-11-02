<template>
  <div class="container">
    <h1>Home</h1>
    <div class="grid">
      <Widget>
        <component :is="KPIComponent" v-bind="kpiProps"></component>
      </Widget>
      <WidgetLoader
        url="https://api.npoint.io/01264aa2a713715ccc1e"
        v-slot="slotProps"
      >
        <component
          :is="kpiComponentLoad"
          :data="slotProps.data"
          color="turquoise"
        ></component>
      </WidgetLoader>
      <WidgetLoader
        url="https://api.npoint.io/ea45973ff614bdbc7ed1"
        v-slot="slotProps"
      >
        <component
          :is="kpiComponentLoad"
          :data="slotProps.data"
          color="turquoise"
        ></component>
      </WidgetLoader>
      <WidgetLoader
        url="https://api.npoint.io/8d900f8ba26cba4acce7"
        v-slot="slotProps"
      >
        <component
          :is="kpiComponentLoad"
          :data="slotProps.data"
          color="turquoise"
        ></component>
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
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import DataTable from "../components/DataTable";
import WidgetLoader from "../components/WidgetLoader";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Widget from "../components/Widget";

export default defineComponent({
  components: {
    DataTable,
    WidgetLoader,
    Widget,
    Loader,
    Error,
  },

  setup() {
    const data = ref(null);

    const fetchAndLoad = async (url) => {
      try {
        const response = await fetch(url);
        data.value = await response.json();
      } catch (e) {
        console.error(e);
      }
    };

    const loadKPI = () => {
      return fetchAndLoad("https://api.npoint.io/01264aa2a713715ccc1e").then(
        () => import("../components/KPI.vue")
      );
    };

    const kpiProps = computed(() => {
      return {
        data: data.value,
        color: "turquoise",
      };
    });

    const KPIComponent = defineAsyncComponent({
      loader: loadKPI,
      loadingComponent: Loader,
      errorComponent: Error,
      delay: 200,
      timeout: 5000,
    });

    const kpiComponentLoad = defineAsyncComponent(() =>
      import("../components/KPI.vue")
    );

    return { KPIComponent, data, kpiProps, kpiComponentLoad };
  },
});
</script>
