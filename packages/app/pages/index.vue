<template>
  <div class="tw-container tw-p-6">
    <section class="tw-h-screen">
      <div class="flex-col">
        <h1 class="tw-font-extrabold tw-text-3xl md:tw-text-6xl">Welcome,</h1>
        <h1 class="tw-font-extrabold tw-text-2xl md:tw-text-6xl">
          Muzaffarabad Resident!
        </h1>
      </div>
      <div class="flex-col tw-my-7">
        <h1
          class="tw-font-extrabold tw-text-lg md:tw-text-6xl tw-text-gray-700"
        >
          Let us set you up with easy government service payments today!
        </h1>
        <h1
          class="tw-font-extrabold tw-text-xl md:tw-text-6xl tw-text-center tw-my-6"
        >
          Are you a?
        </h1>
      </div>
      <div class="flex tw-mt-6">
        <div class="flex-col align-center tw-w-1/2 px-6">
        <HouseIcon /><v-btn outlined class="my-4" color="primary">Homeowner</v-btn>
        </div>
        <nuxt-link to="/authenticate" class="flex-col align-center tw-w-1/2 px-6">
        <ShopIcon /><v-btn outlined class="my-4" color="accent">Business Owner</v-btn></nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import HouseIcon from "@/static/icons/house.svg?inline";
import ShopIcon from "@/static/icons/shop.svg?inline";
export default {
  components: {
    HouseIcon,
    ShopIcon,
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
