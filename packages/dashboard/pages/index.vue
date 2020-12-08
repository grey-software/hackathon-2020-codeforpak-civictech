<template>
  <div class="container">
    <section class="tw-h-screen tw-grid tw-place-items-center">
      <div class="flex-col align-center tw-mb-12">
        <v-data-table
          :headers="headers"
          :items="serviceCharges"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-icon v-if="item.status === 0" color="primary"
              >mdi-check-circle</v-icon
            >
            <v-icon v-else color="error">mdi-error</v-icon>
          </template>
          <template v-slot:[`item.service_type`]="{ item }">
            <div class="tw-capitalize">{{ item.service_type }}</div>
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
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    console.log(`http://localhost:8000/service-charges`);
    const serviceChargesResult = await $axios.$get(
      `http://localhost:8000/service-charges`
    );
    console.log(serviceChargesResult[0].request);
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
    };
  },
};
</script>

<style scoped>
.v-btn {
  width: max-content;
}
</style>
