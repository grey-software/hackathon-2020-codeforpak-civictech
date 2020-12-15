<template>
  <div class="t-container t-p-6">
    <section class="t-h-screen">
      <div class="flex-col">
        <h1 class="t-font-extrabold t-text-3xl md:t-text-6xl">
          {{ rtl ? "شروع کرنے سے پہلے" : "Before we start," }}
        </h1>
        <h1 class="t-font-extrabold t-text-xl md:t-text-6xl t-my-6">
          <!-- {{rtl? "" : ""}} -->
          {{
            rtl
              ? "اس ایپ کو مناسب طریقے سے چلانے کے لئے فون سے نوٹیفیکیشن اجازتوں کی ضرورت ہے۔"
              : "Please enable notification permissions on your phone for the app to run properly."
          }}
        </h1>
      </div>
      <div class="flex-col t-my-7 align-center">
        <v-btn
          @click="requestPermissions"
          x-large
          outlined
          class="my-4"
          color="primary"
        >
          <v-icon>mdi-key-variant</v-icon>
          {{ rtl ? "قبول کریں" : "Grant" }}
        </v-btn>
      </div>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ snackbarMessage }}
      </v-snackbar>
      <!-- <h1 class="t-font-extrabold t-text-xl md:t-text-6xl t-my-6">
       {{rtl? "شکریہ" : "Thank you!"}}
      </h1> -->
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      timeout: 2000
    };
  },
  methods: {
    requestPermissions() {
      Notification.requestPermission(async (status) => {
        if (status === "granted") {
          console.log("Permissions granted");
          await this.requestPushSubscription()
        } else {
          console.log("Permissions denied");
          this.snackbar = true;
          this.snackbarMessage =
            "Please grant us permissions to send you notifications.";
        }
      });
    },
    async requestPushSubscription() {
      const sw = await navigator.serviceWorker.ready;
      console.log(sw);
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VAPID_PUB_KEY,
      });
      console.log(subscription);
      console.log(JSON.stringify(subscription));
      this.$axios
        .post(`${process.env.API_URL}/push/add-subscription`, {
          subscription: JSON.stringify(subscription),
          phone: this.phone,
          cnic: this.cnic,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
  },
  computed: {
    ...mapState(["rtl", "phone", "cnic"]),
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
