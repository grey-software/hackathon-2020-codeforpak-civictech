<template>
  <div>
    <v-app-bar app elevate-on-scroll flat>
      <div class="tw-container flex tw-mx-auto align-center">
        <div class="flex tw-align-center tw-mr-auto">
          <nuxt-link
            class="flex align-center tw-mr-5"
            to="/"
            @click.native="checked = false"
          >
            <img class="logo tw-py-2 mr-4" src="/logo.png" />
            <div class="tw-font-extrabold tw-text-xl">
              {{ rtl ? "سٹیزن پے " : "Citizen Pay" }}
            </div>
          </nuxt-link>
        </div>
        <div class="navbar-spacer tw-mx-auto"></div>

        <div class="flex align-center">
          <v-switch dense hide-details v-model="rtlSwitch"> </v-switch>
          <v-app-bar-nav-icon
            class="tw-mx-2"
            x-large
            @click="drawerOpen = !drawerOpen"
          ></v-app-bar-nav-icon>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher v-model="drawerOpen" app right>
      <SideDrawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import SideDrawer from "@/components/SideDrawer";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    SideDrawer,
  },
  data() {
    return {
      drawerOpen: false,
      rtlSwitch: false,
    };
  },
  mounted() {
    this.rtlSwitch = this.$store.state.rtl;
  },
  computed: {
    ...mapState(["rtl"]),
  },
  methods: {
    ...mapMutations(["setRtl"]),
  },
  watch: {
    rtlSwitch(value) {
      this.setRtl({ rtl: value });
    },
  },
};
</script>

<style scoped>
.logo {
  height: 48px;
}

.nav-icon {
  height: 48px;
  width: 48px;
}

.navbar-spacer {
  flex-grow: 1;
  max-width: 72px;
}
</style>
