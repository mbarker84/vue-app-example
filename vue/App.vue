<template>
  <nav>
    <ul class="nav__list">
      <li v-for="link in links" :key="link.to">
        <router-link :to="link.to" class="nav__link">{{
          link.title
        }}</router-link>
      </li>
    </ul>
  </nav>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const links = [
      {
        title: "Home",
        to: "/",
      },
      {
        title: "About",
        to: "/about",
      },
    ];

    return {
      links,
    };
  },
});
</script>
