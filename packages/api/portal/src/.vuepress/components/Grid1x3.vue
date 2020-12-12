<template>
  <div class="flex align-center justify-space-between flex-wrap">
    <span
      v-for="gridItem in gridItems"
      :key="gridItem.title"
      class="w-full w-1/3"
    >
      <div class="flex flex-col align-center">
        <img class="w-48 h-48 mb-4" :src="gridItem.icon" />
        <h1 class="text-2xl font-bold mb-4">{{ gridItem.title }}</h1>
        <p class="text-lg">{{ gridItem.desc }}</p>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    gridItems: Array,
  },
};
</script>