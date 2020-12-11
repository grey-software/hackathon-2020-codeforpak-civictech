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
// import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    // Footer,
  },
  methods: {
    async subscribe() {
      const sw = await navigator.serviceWorker.ready;
      console.log(sw);
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VAPID_PUB_KEY,
      });
      console.log(subscription);
      const subscriptionModel = this.$parse.Object.extend("PushSubscriber");
      console.log(this.$parse.Object);
      console.log(subscriptionModel);
      console.log(JSON.stringify(subscription));

      this.$axios
        .post(`${process.env.API_URL}push/add-subscription`, {
          subscription: JSON.stringify(subscription),
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
  },
  async mounted() {
    window.addEventListener("load", async () => {
      const sw = await navigator.serviceWorker.register("/sw.js");
      console.log(sw);
    });
    await this.subscribe();
  },
};
</script>

<style>
@import "@/assets/styles/customize-vuetify.css";
</style>
