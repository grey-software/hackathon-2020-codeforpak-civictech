import { ServiceChargeRequest } from "./ServiceChargeRequest";
const Parse = require("parse/node");

Parse.initialize(process.env.APP_ID, process.env.APP_MASTER_KEY);

export class ServiceChargeRequestModel extends Parse.Object {
  constructor(serviceChargeRequest: ServiceChargeRequest) {
    super("ServiceChargeRequest");
    this.set("amount", serviceChargeRequest.amount);
    this.set("request_date", serviceChargeRequest.request_date);
    this.set("due_date", serviceChargeRequest.due_date);
    this.set("status", serviceChargeRequest.status);
    this.set("debit_party", serviceChargeRequest.debit_party);
    this.set("credit_party", serviceChargeRequest.credit_party);
    this.set("service_type", serviceChargeRequest.service_type);
    this.set("resident", serviceChargeRequest.resident);
  }
}
