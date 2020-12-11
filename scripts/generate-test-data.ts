import { testResidents } from "../packages/api/models/Resident";
import { generateTestServiceCharges } from "../packages/api/models/ServiceCharge";
const fs = require("fs");
const path = require("path");

const serviceChargesPath = path.join(
  __dirname,
  "../packages/test-data/service-charges.json"
);
const residentsPath = path.join(
  __dirname,
  "../packages/test-data/residents.json"
);
const testServiceCharges = generateTestServiceCharges(20);
const serviceChargesFd = fs.openSync(serviceChargesPath, "w+");
const residentsFd = fs.openSync(residentsPath, "w+");
fs.writeSync(serviceChargesFd, JSON.stringify(testServiceCharges), 0, "utf8");
fs.writeSync(residentsFd, JSON.stringify(testResidents), 0, "utf8");
