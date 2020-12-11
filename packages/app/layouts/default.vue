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
// addEventListener('load', async () => {
//   const sw = await navigator.serviceWorker.register('/sw.js')
// })

// const subscribe = async () => {
//   const sw = await navigator.serviceWorker.ready
//   const push = await sw.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: ""
//   })
// }

import Header from '@/components/Header'
// import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    // Footer,
  },
}
</script>

<style>
@import '@/assets/styles/customize-vuetify.css';
</style>
