<template>
  <div class="container">
    <h1>Home</h1>
    <div class="grid">
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
import { defineComponent } from "vue";
import DataTable from "../components/DataTable";
import KPI from "../components/KPI";
import WidgetLoader from "../components/WidgetLoader";

export default defineComponent({
  components: {
    DataTable,
    KPI,
    WidgetLoader,
  },

  setup() {},
});
</script>
