<template>
  <div>
    <NavBar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const routesWithNavBar = ["/about", "/contact"];
    const showNavBar = routesWithNavBar.includes(route.path);
    return {
      showNavBar,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
