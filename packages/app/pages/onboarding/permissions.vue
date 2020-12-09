<template>
  <div class="tw-container tw-p-6">
    <section class="tw-h-screen">
      <div class="flex-col">
        <h1 class="tw-font-extrabold tw-text-3xl md:tw-text-6xl">
          {{rtl? "شروع کرنے سے پہلے" : "Before we start,"}}
        </h1>
        <h1 class="tw-font-extrabold tw-text-xl md:tw-text-6xl tw-my-6">
          <!-- {{rtl? "" : ""}} -->
          {{rtl? "اس ایپ کو مناسب طریقے سے چلانے کے لئے فون سے نوٹیفیکیشن اجازتوں کی ضرورت ہے۔" : "This app requires notification permissions from your phone to run properly."}} 
        </h1>
      </div>
      <div class="flex-col tw-my-7 align-center">
        <v-btn
          @click="requestPermissions"
          x-large
          outlined
          class="my-4"
          color="primary">
         {{rtl? "قبول کریں" : "Grant"}}
          </v-btn>
      </div>
      <!-- <h1 class="tw-font-extrabold tw-text-xl md:tw-text-6xl tw-my-6">
       {{rtl? "شکریہ" : "Thank you!"}}
      </h1> -->
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    requestPermissions() {
      const router = this.$router;
      Notification.requestPermission( (status) => {
        if (status === "granted") {
          console.log("Permissions granted");
          router.push({ path: "/onboarding/authenticate" });
          this.displayNotification()
        } else {
          console.log("Permissions denied");
        }
      });
    },
    displayNotification() {
      console.log(navigator.serviceWorker)
      if (Notification.permission == "granted") {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          console.log(reg)
          reg.showNotification("Hello world!");
        });
      }
    },
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
