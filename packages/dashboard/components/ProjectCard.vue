<template>
  <div class="project-card tw-p-4 tw-mb-4">
    <div>
      <div class="flex align-center my-4">
        <img class="logo justify-start" :src="project.logo" />
        <div class="ml-3">
          <h5 class="tw-text-2xl tw-font-bold">{{ project.name }}</h5>
        </div>
      </div>

      <div class="description">
        <p class="tw-text-xl">{{ project.desc }}</p>
      </div>
    </div>

    <div class="flex tw-mt-4">
      <v-btn
        color="primary"
        :href="project.repo"
        outlined
        target="_blank"
        class="tw-mr-4"
        x-large
      >
        <v-icon left large class="mr-3"> mdi-link </v-icon>Link
      </v-btn>
      <!-- <v-btn outlined x-large color="primary" :href="project.link" target="_blank">
        <v-icon left large class="tw-mr-3"> mdi-discord </v-icon>Discord Lead
      </v-btn> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      name: String,
      desc: String,
      logo: String,
      link: String,
      discord: String
      
    },
  },
}
</script>

<style scoped>
.status {
  top: 12px;
  right: 12px;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  position: relative;
  opacity: 0.69;
  transition: opacity 0.2s ease-out;
}

.status:hover {
  opacity: 1;
}

.project-card {
  width: 369px;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: 12px 24px 72px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-direction: column;
  margin-right: 2rem;
}

.logo {
  height: 48px;
}

.project-heading {
  font-size: 32px;
  line-height: 1.2;
  font-weight: 800;
}

.description {
  width: 309px;
}

@media screen and (max-width: 768px) {
  .project-card {
    margin-right: 0;
  }
}
</style>
