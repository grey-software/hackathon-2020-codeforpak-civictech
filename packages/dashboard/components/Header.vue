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
            <div class="tw-font-extrabold tw-text-xl">Gov Dashboard</div>
          </nuxt-link>
          <!-- <nuxt-link
            class="flex align-center tw-mx-4"
            to="/"
            @click.native="checked = false"
          >
            <div class="tw-font-extrabold tw-text-xl"></div>
          </nuxt-link> -->
          <!-- <nuxt-link
            class="flex align-center tw-mx-4"
            to="/"
            @click.native="checked = false"
          >
            <div class="tw-font-extrabold tw-text-xl"></div>
          </nuxt-link> -->
        </div>
        <div class="navbar-spacer tw-mx-auto"></div>

        <div class="flex align-center">
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
import SideDrawer from '@/components/SideDrawer'

export default {
  components: {
    SideDrawer,
  },
  data() {
    return {
      drawerOpen: false
    }
  },
}
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
