import { UserModel } from "./models/UserModel";
import { testResidents, Resident } from "./models/Resident";
import { ServiceChargeModel } from "./models/ServiceChargeModel";
import {
  ServiceCharge,
  generateTestServiceCharges,
} from "./models/ServiceCharge";
// Loads required libraries
require("dotenv").config();
const ParseDashboard = require("parse-dashboard");
const ParseServer = require("parse-server").ParseServer;
import Parse from "parse/node";
const path = require("path");
import express from "express";
const cors = require("cors");

const PORT = 8000;
const BASE_URL = process.env.BASE_URL || "localhost";

const databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/dev";
if (!databaseUri) {
  console.log("DATABASE_URI not specified, falling back to localhost.");
}
const appId = process.env.APP_ID || "template-backend-parse-express-ts";

Parse.initialize(appId, process.env.APP_MASTER_KEY);
Parse.serverURL = `https://${BASE_URL}/api`;
Parse.Object.registerSubclass("User", UserModel);

import { UsersRouter } from "./routes/users";
import { ServiceChargesRouter } from "./routes/service-charges";
import { AuthRouter } from "./routes/auth";
import { PushRouter } from "./routes/push";

import BodyParser from "body-parser";
import { testUserInitData, UserInitData } from "models/UserInitData";

console.log(`DATABASE_URI: ${databaseUri}`);

const parseApi = new ParseServer({
  databaseURI: databaseUri,
  appId: appId,
  masterKey: process.env.APP_MASTER_KEY || "",
  serverURL: process.env.SERVER_URL || `https://${BASE_URL}/api`,
  verbose: true,
});

const masterKey = process.env.APP_MASTER_KEY || "";
console.log(masterKey);

const userDetails = {
  user: process.env.DASHBOARD_USER,
  pass: process.env.DASHBOARD_PASS,
};

console.log(userDetails);
var parseDashboard = new ParseDashboard({
  apps: [
    {
      serverURL: `https://${BASE_URL}/api`,
      appId: process.env.APP_ID,
      masterKey: process.env.APP_MASTER_KEY || "",
      appName: "Grey Software Parse Backend Template",
    },
  ],
  users: [
    {
      user: process.env.DASHBOARD_USER,
      pass: process.env.DASHBOARD_PASS,
    },
  ],
  trustProxy: 1
});

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(BodyParser.json());

// Serve static assets from the /public folder
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/portal", express.static(path.join(__dirname, "/portal/src/.vuepress/dist")));

// Serve the Parse API at /api
app.use("/api", parseApi);

// Serve the Parse Dashboard at /dashboard
app.use("/dashboard", parseDashboard);
app.use("/users", UsersRouter);
app.use("/service-charges", ServiceChargesRouter);
app.use("/auth", AuthRouter);
app.use("/push", PushRouter);

app.get("/", (_, res) => res.redirect("/portal"));

// const populateDbWithTestData = () => {
//   const testServiceCharges = generateTestServiceCharges(20);
//   testServiceCharges.forEach((serviceCharge: ServiceCharge) => {
//     const serviceChargeModel = new ServiceChargeModel(serviceCharge);
//     serviceChargeModel
//       .save()
//       .then((savedModel: any) => {
//         // console.log(`Service charge successfully created: ${savedModel.id}`);
//       })
//       .catch((e: any) => console.log(e));
//   });

//   testUserInitData.forEach((userData: UserInitData) => {
//     const userModel = new UserModel(userData);
//     userModel
//       .save()
//       .then((savedModel: any) => {
//         // console.log(`User successfully created: ${savedModel.id}`);
//       })
//       .catch((e: any) => console.log(e));
//   });
// };

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${BASE_URL}`);
  // populateDsbWithTestData();
});
