<template>
  <div class="tw-container tw-p-6 tw-grid tw-place-items-center">
    <section class="tw-h-screen">
      <div class="flex-col">
        <h1 class="tw-font-extrabold tw-text-3xl md:tw-text-6xl">
         <!-- {{rtl? "" : ""}} -->
         {{rtl? "اپنی شناخت کرائیں" : "Verify your identity"}}
        </h1>
        <h1 class="tw-font-extrabold tw-text-xl md:tw-text-6xl tw-my-6">
          {{rtl? "براہ کرم فون نمبر درج کریں تاکہ ہم آپ کی شناخت کی تصدیق کے لئے کوڈ کے ساتھ ایک ایس ایم ایس بھیج سکیں۔" : "Please enter your phone number so we can send you an SMS with a code and verify your identity."}}
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
      
      <div v-if="codeRequestResponded" class="flex-col">
        <v-text-field
          label="Your code"
          prepend-icon="mdi-lock-open"
          v-model="code"
        ></v-text-field>
        <v-btn>Submit</v-btn>
      </div>
      <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
      v-if="codeRequestSent"
    ></v-progress-circular>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      code: "",
      codeRequestSent: false,
      codeRequestResponded: false,
    };
  },
  methods: {
    async requestAuth() {
      console.log("Requesting auth");
      this.codeRequestSent = true;
      await setTimeout(() => {}, 2000);
      this.codeRequestResponded = true;
          this.codeRequestSent = false;
      // this.$axios
      //   .post("http://localhost:8000/auth/request", {
      //     phone: this.phone,
      //   })
      //   .then((res) => {
      //     console.log(res);
          
      //   })
      //   .catch((e) => console.log(e));
    },
    async validateCode() {
      console.log("Validating code");
      this.codeRequestSent = true;
      await setTimeout(() => {}, 2000);
          this.codeRequestSent = false;
      // this.$axios
      //   .post("http://localhost:8000/api/auth/validate", {
      //     code: this.code,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     this.$router.push({ path: "/register" });
      //   })
      //   .catch((e) => console.log(e));
    },
  },
};
</script>
