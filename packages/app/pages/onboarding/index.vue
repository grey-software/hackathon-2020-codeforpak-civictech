<template>
  <div class="t-container t-p-6">
    <section class="t-h-screen">
      <div class="flex-col">
        <h1 class="t-font-extrabold t-text-3xl md:t-text-6xl">
          {{ rtl ? "السلام عليكم" : "Welcome" }}
        </h1>
        <h1
          class="t-font-extrabold t-text-lg md:t-text-6xl t-text-gray-700 t-my-5"
        >
          {{ rtl ? "TODO" : "Let's start with your CNIC and phone number!" }}
        </h1>
      </div>
      <div class="flex-col">
        <v-text-field
          label="03xxxxxxxxx"
          prepend-icon="mdi-phone"
          v-model="phone"
        ></v-text-field>
        <v-text-field
          label="CNIC"
          prepend-icon="mdi-account-key"
          v-model="cnic"
        ></v-text-field>
        <v-btn color="primary" @click="requestAuth">Submit</v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      phone: "",
      cnic: "",
    };
  },
  computed: {
    ...mapState(["rtl"]),
  },

  methods: {
    ...mapMutations(["setPhone", "setCnic"]),
    requestAuth() {
      this.setPhone({ phone: this.phone });
      this.setCnic({ cnic: this.cnic });
      this.$axios
        .post(`${process.env.API_URL}/users/initialize`, {
          user: {
            phone: this.phone,
            cnic: this.cnic,
          },
        })
        .then((res) => {
          console.log(res);
          //   if (res.data.status  === 0 || res.statusText === "OK") {
          //     this.$router.push("/onboarding/permissions");
          //   }
          this.$router.push("/onboarding/permissions");
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
