<template>
  <div class="widget" :style="{ 'aspect-ratio': loading ? aspectRatio : '' }">
    <Loader v-if="loading"></Loader>
    <Error v-else-if="error" :errorMessage="error"></Error>
    <slot :data="data" v-if="data"></slot>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from "vue";
import Loader from "./Loader";
import Error from "./Error";

export default defineComponent({
  components: { Loader, Error },

  props: {
    url: String,
    aspectRatio: {
      type: String,
      default: "5 / 3",
    },
  },

  setup(props) {
    const { url, aspectRatio } = props;
    const loading = ref(true);
    const error = ref(null);
    const data = ref(null);
    const controller = ref(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.value.signal });
        const jsonData = await response.json();
        data.value = jsonData;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onBeforeMount(() => {
      controller.value = new AbortController();
      fetchData();
    });

    onBeforeUnmount(() => controller.value.abort());

    return { loading, error, data, aspectRatio };
  },
});
</script>
