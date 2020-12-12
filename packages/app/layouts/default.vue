<template>
  <v-app>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  async mounted() {
    window.addEventListener("load", async () => {
      const sw = await navigator.serviceWorker.register("/sw.js");
      console.log(sw);
    });
  },
};
</script>

<style>
@import "@/assets/styles/customize-vuetify.css";
</style>
