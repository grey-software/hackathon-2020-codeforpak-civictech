<template>
  <div class="t-container t-p-6">
    <section class="t-h-screen">
      <div class="flex-col">
        <h1 class="t-font-extrabold t-text-3xl md:t-text-6xl">Welcome,</h1>
        <h1 class="t-font-extrabold t-text-2xl md:t-text-6xl">
          {{rtl? "السلام عليكم" : "Muzaffarabad Resident!"}}
        </h1>
      </div>
      <div class="flex-col t-my-7">
        <h1
          class="t-font-extrabold t-text-lg md:t-text-6xl t-text-gray-700"
        >
         {{rtl? "آج ہم آپ کی ادائیگی طے کرتے ہیں" : "Let us set you up with easy government service payments today!"}}
        </h1>
        <h1
          class="t-font-extrabold t-text-xl md:t-text-6xl t-text-center t-my-6"
        >
         <!-- {{rtl? "" : ""}} -->
         {{rtl? "تم کیا ہو" : "Are you a?"}}
        </h1>
      </div>
      <div class="flex t-mt-6">
        <nuxt-link to="/onboarding/permissions" class="flex-col align-center t-w-1/2 px-6">
        <HouseIcon /><v-btn outlined class="my-4" color="primary">{{rtl? "گھر کا مالک" : "Homeowner"}}</v-btn>
        </nuxt-link>
        <nuxt-link to="/onboarding/permissions" class="flex-col align-center t-w-1/2 px-6">
        <ShopIcon /><v-btn outlined class="my-4" color="accent">{{rtl? "کاروباری مالک" : "Business Owner"}} </v-btn></nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import HouseIcon from "@/static/icons/house.svg?inline";
import ShopIcon from "@/static/icons/shop.svg?inline";

import { mapState } from 'vuex';

export default {
  created () {
    let currentUser = this.$parse.User.current();
    if(!currentUser) {
      console.log("No current user")
      this.$router.push("onboarding")
    }
  },
  components: {
    HouseIcon,
    ShopIcon,
  },
  computed: {
    ...mapState(["rtl"]),
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
