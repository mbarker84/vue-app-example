<template>
  <h1>{{ title }}</h1>
  <p v-if="loading">Loading...</p>
  <DataTable :items="people" v-if="people.length"></DataTable>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { json } from "d3-fetch";
import DataTable from "./components/DataTable";

export default defineComponent({
  components: {
    DataTable,
  },

  setup() {
    const title = "Leaderboard";
    const loading = ref(true);
    const people = ref([]);

    const fetchPeople = () => {
      json("https://api.npoint.io/45adfd0faf4952705643").then((data) => {
        people.value = data;
        loading.value = false;
      });
    };

    onMounted(() => {
      fetchPeople();
    });

    return {
      title,
      people,
      loading,
    };
  },
});
</script>
