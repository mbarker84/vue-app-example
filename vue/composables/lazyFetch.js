import { onBeforeUnmount } from "vue";
import useSWRV from "swrv";

export function useLazyFetch(url) {
  const controller = new AbortController();

  const fetchData = () => {
    return fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((response) => (data.value = response))
      .catch((e) => (error.value = e));
  };

  const { data, isValidating, error } = useSWRV(url, fetchData);

  onBeforeUnmount(() => controller.abort());

  return {
    isValidating,
    data,
    error,
  };
}
