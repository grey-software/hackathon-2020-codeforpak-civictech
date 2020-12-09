<template>
  <div class="tw-container tw-p-6 tw-grid tw-place-items-center">
    <section class="tw-h-screen">
      <div class="flex-col">
        <h1 class="tw-font-extrabold tw-text-3xl md:tw-text-6xl">
          Verify your identity
        </h1>
        <h1 class="tw-font-extrabold tw-text-xl md:tw-text-6xl tw-my-6">
          Please enter your phone number so we can send you an SMS with a code and verify your identity. 
        </h1>
      </div>
      <div class="flex-col">
        <v-text-field
          label="03xxxxxxxxx"
          prepend-icon="mdi-phone"
          v-model="phone"
        ></v-text-field>
        <v-btn @click="requestAuth">Submit</v-btn>
      </div>
      <div v-show="codeRequestSent" class="flex-col">
        <v-text-field
          label="Your code"
          prepend-icon="mdi-lock-open"
          v-model="code"
        ></v-text-field>
        <v-btn>Submit</v-btn>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "03139288208",
      code: "",
      codeRequestSent: false,
    };
  },
  methods: {
    requestAuth() {
      console.log("Requesting auth");
      this.$axios
        .post("http://localhost:8000/auth/request", {
          phone: this.phone,
        })
        .then((res) => {
          console.log(res);
          this.codeRequestSent = true;
        })
        .catch((e) => console.log(e));
    },
    validateCode() {
      this.$axios
        .post("http://localhost:8000/api/auth/validate", {
          code: this.code,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ path: "/register" });
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
