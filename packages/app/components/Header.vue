<template>
  <div>
    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawerOpen"
      app
      left
      v-if="!rtl"
    >
      <SideDrawer />
    </v-navigation-drawer>
    <v-app-bar app elevate-on-scroll flat>
      <div class="t-container flex t-mx-auto align-center">
        <div class="flex t-align-center t-mr-auto">
          <v-app-bar-nav-icon
            class="t-mx-2"
            x-large
            v-if="!rtl"
            @click="drawerOpen = !drawerOpen"
          ></v-app-bar-nav-icon>
          <nuxt-link
            class="flex align-center t-mr-5"
            to="/"
            @click.native="checked = false"
          >
            <img class="logo t-py-2 mr-4" src="/logo.png" />
            <div class="t-font-extrabold t-text-xl">
              {{ rtl ? "سٹیزن پے " : "Citizen Pay" }}
            </div>
          </nuxt-link>
        </div>
        <div class="navbar-spacer t-mx-auto"></div>

        <div class="flex align-center">
          <v-switch dense hide-details v-model="rtlSwitch"> </v-switch>
          <v-app-bar-nav-icon
            class="t-mx-2"
            x-large
            @click="drawerOpen = !drawerOpen"
            v-if="rtl"
          ></v-app-bar-nav-icon>
        </div>

      
        <div class="flex align-center">
          <nuxt-link to="/onboarding" class="flex-col align-center t-w-1/2 px-6"> 
          <img class="login t-py-2 mr-4" src="/login.png" />
          </nuxt-link>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawerOpen"
      app
      right
      v-if="rtl"
    >
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
    const largeScreen = this.$mq === "lg" || this.$mq === "xl";
    this.drawerOpen = largeScreen;
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

.login {
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

