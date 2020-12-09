import { ServiceCharge } from "./ServiceCharge";
const Parse = require("parse/node");


Parse.initialize(
    process.env.APP_ID,
    process.env.APP_MASTER_KEY
  );

export class ServiceChargeModel extends Parse.Object {
  constructor(serviceCharge: ServiceCharge) {
    super("ServiceCharge");
    this.set("request", serviceCharge.request);
    this.set("response", serviceCharge.response);
  }
}

