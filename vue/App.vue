<template>
  <header>
    <nav>
      <ul class="nav__list">
        <li v-for="link in links" :key="link.to">
          <router-link :to="link.to" class="nav__link">{{
            link.title
          }}</router-link>
        </li>
      </ul>
    </nav>
    <a
      class="header__github-link"
      href="https://github.com/mbarker84/vue-app-example"
      >View on Github</a
    >
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <small>&copy; Michelle Barker</small>
  </footer>
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
        title: "Locations",
        to: "/locations",
      },
    ];

    return {
      links,
    };
  },
});
</script>
