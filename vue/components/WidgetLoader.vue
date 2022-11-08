<template>
  <div class="widget" :style="{ 'aspect-ratio': loading ? aspectRatio : '' }">
    <component :is="AsyncComponent" v-bind="componentProps"></component>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  defineAsyncComponent,
  computed,
  onBeforeUnmount,
} from "vue";
import Loader from "./Loader";
import Error from "./Error";

export default defineComponent({
  props: {
    aspectRatio: {
      type: String,
      default: "5 / 3",
    },
    url: String,
    importFunction: Function,
  },

  setup(props) {
    const { aspectRatio, url, importFunction } = props;
    const data = ref(null);
    const loading = ref(true);
    const controller = new AbortController();

    const loadComponent = () => {
      return fetch(url, { signal: controller.signal })
        .then((response) => response.json())
        .then((response) => (data.value = response))
        .then(importFunction)
        .catch((e) => console.error(e))
        .finally(() => (loading.value = false));
    };

    const componentProps = computed(() => {
      return {
        data: data.value,
        color: "turquoise",
      };
    });

    const AsyncComponent = defineAsyncComponent({
      loader: loadComponent,
      loadingComponent: Loader,
      errorComponent: Error,
      delay: 200,
      timeout: 5000,
    });

    onBeforeUnmount(() => controller.abort());

    return { aspectRatio, AsyncComponent, props, componentProps, loading };
  },
});
</script>
