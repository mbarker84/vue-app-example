<template>
  <div
    class="widget"
    :style="{ 'aspect-ratio': shouldShowLoader ? aspectRatio : '' }"
  >
    <Loader v-if="shouldShowLoader"></Loader>
    <Error v-else-if="error" :errorMessage="error.message"></Error>
    <Transition>
      <component
        :is="AsyncComponent"
        v-bind="componentProps"
        v-if="data"
      ></component>
    </Transition>
    <Loader
      v-if="isValidating && data"
      class="widget__validating"
      text=""
      aria-hidden="true"
    ></Loader>
  </div>
</template>

<script>
import {
  defineComponent,
  defineAsyncComponent,
  computed,
  onBeforeUnmount,
} from "vue";
import Loader from "./Loader";
import Error from "./Error";
import useSWRV from "swrv";

export default defineComponent({
  components: {
    Error,
    Loader,
  },

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

    const controller = new AbortController();

    const fetchData = () => {
      return fetch(url, { signal: controller.signal })
        .then((response) => response.json())
        .then((response) => (data.value = response))
        .catch((e) => (error.value = e));
    };

    const componentProps = computed(() => {
      return {
        data: data.value || null,
        color: "turquoise",
      };
    });

    const { data, isValidating, error } = useSWRV(url, fetchData);

    const shouldShowLoader = computed(() => isValidating.value && !data.value);

    const AsyncComponent = defineAsyncComponent({
      loader: importFunction,
      delay: 200,
      timeout: 5000,
    });

    onBeforeUnmount(() => controller.abort());

    return {
      aspectRatio,
      AsyncComponent,
      componentProps,
      isValidating,
      data,
      error,
      shouldShowLoader,
    };
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
