<template>
  <div class="container">
    <div class="flex-col t-mb-12 t-mx-4">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        solo 
        class="t-my-8"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="serviceCharges"
        :items-per-page="10"
        class="elevation-1"
        :search="search"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-icon v-if="item.status === 0" color="primary"
            >mdi-check-circle</v-icon
          >
          <v-icon v-else color="error">mdi-error</v-icon>
        </template>
        <template v-slot:[`item.service_type`]="{ item }">
          <div class="t-capitalize">{{ item.service_type }}</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click="console.log(item)" color="primary" icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in menuItems" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
console.log(process.env.API_URL);
export default {
  async asyncData({ $axios }) {
    // console.log($nuxt)
    const serviceChargesResult = await $axios.$get(
      `${process.env.API_URL}/service-charges`
    );
    // console.log(serviceChargesResult);
    const serviceCharges = serviceChargesResult.map((serviceCharge) => {
      const timestamp = serviceCharge.response.payload.timestamp;
      const tIndex = timestamp.indexOf("T");
      const dotIndex = timestamp.indexOf(".");
      const date = timestamp.slice(0, tIndex);
      const time = timestamp.slice(tIndex + 1, dotIndex);
      return {
        service_type: serviceCharge.request.service_type.replace("_", " "),
        amount: serviceCharge.request.amount,
        sender_phone: serviceCharge.request.resident.phone,
        date: date,
        time: time,
        status: serviceCharge.response.status,
      };
    });
    return { serviceCharges };
  },
  data() {
    return {
      headers: [
        { text: "Status", value: "status" },
        { text: "Service Type", value: "service_type" },
        { text: "Amount (PKR)", value: "amount" },
        { text: "Sender Phone", value: "sender_phone" },
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
      ],
      menuItems: [
        {
          title: "Info",
        },
      ],
      search: ""

    };
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
