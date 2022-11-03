<template>
  <div class="widget" :style="{ '--ar': isValidating ? aspectRatio : '' }">
    <Loader v-if="isValidating"></Loader>
    <Error v-else-if="error" :errorMessage="error"></Error>
    <slot :data="data" v-else-if="data"></slot>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from "vue";
import Loader from "./Loader";
import Error from "./Error";
import useSWRV from "swrv";
import LocalStorageCache from "swrv/dist/cache/adapters/localStorage";

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
    // const error = ref(null);
    // const data = ref(null);
    // const controller = ref(null);
    const controller = new AbortController();

    const fetchFn = () => {
      return fetch(url, { signal: controller.signal })
        .then((response) => response.json())
        .catch((e) => console.error(e))
        .finally(() => (loading.value = false));
    };

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(url, { signal: controller.value.signal });
    //     const jsonData = await response.json();
    //     data.value = jsonData;
    //   } catch (err) {
    //     error.value = err.message;
    //   } finally {
    //     loading.value = false;
    //   }
    // };

    const { data, error, isValidating } = useSWRV(url, fetchFn);

    onBeforeMount(() => {
      // controller.value = new AbortController();
      const swrvFetch = useSWRV(url, fetchFn, {
        cache: new LocalStorageCache("swrv"),
        shouldRetryOnError: false,
      });
      data.value = swrvFetch.data;
      error.value = swrvFetch.error;
      // fetchData();
    });

    onBeforeUnmount(() => controller.abort());

    return { loading, error, data, aspectRatio, isValidating };
  },
});
</script>
