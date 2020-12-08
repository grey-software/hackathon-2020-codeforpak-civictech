import { UserModel } from './models/UserModel';
import { testResidents, Resident } from './models/Resident';
import { ServiceChargeModel } from "./models/ServiceChargeModel";
import { ServiceCharge, testServiceCharges } from "./models/ServiceCharge";
// Loads required libraries
require("dotenv").config();
var ParseDashboard = require("parse-dashboard");
const ParseServer = require("parse-server").ParseServer;
import Parse from "parse/node"
var path = require("path");
import express from "express";


const PORT = 8000;
const BASE_URL = process.env.BASE_URL || "localhost";

var databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/dev";
if (!databaseUri) {
  console.log("DATABASE_URI not specified, falling back to localhost.");
}


Parse.initialize(
  "template-backend-parse-express-ts",
  process.env.APP_MASTER_KEY
);
Parse.serverURL = `http://${BASE_URL}:${PORT}/api`;
Parse.Object.registerSubclass("User", UserModel);


import { UsersRouter } from "./routes/users";
import { ServiceChargesRouter } from "./routes/service-charges";

import BodyParser from "body-parser";


console.log(`DATABASE_URI: ${databaseUri}`);


const parseApi = new ParseServer({
  databaseURI: databaseUri,
  appId: process.env.APP_ID || "template-backend-parse-express-ts",
  masterKey: process.env.APP_MASTER_KEY || "",
  serverURL: process.env.SERVER_URL || `http://${BASE_URL}:${PORT}/api`,
  verbose: true,
});

const masterKey = process.env.APP_MASTER_KEY || "";
console.log(masterKey);

const userDetails = {
  user: process.env.DASHBOARD_USER,
  pass: process.env.DASHBOARD_PASS,
};

console.log(userDetails);
var parseDashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `http://${BASE_URL}:${PORT}/api`,
        appId: "template-backend-parse-express-ts",
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
  },
  { allowInsecureHTTP: true }
);

var app = express();

// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(BodyParser.json());

// Serve static assets from the /public folder
app.use("/public", express.static(path.join(__dirname, "/public")));

// Serve the Parse API at /api
app.use("/api", parseApi);

// Serve the Parse Dashboard at /dashboard
app.use("/dashboard", parseDashboard);
app.use("/users", UsersRouter);
app.use("/service-charges", ServiceChargesRouter);

app.get("/", (_, res) =>
  res.send("Your backend is live! Visit /dashboard for more details!")
);

const populateDbWithTestData = () => {
  testServiceCharges.forEach((serviceCharge: ServiceCharge) => {
    const serviceChargeModel = new ServiceChargeModel(serviceCharge);
    serviceChargeModel
      .save()
      .then((savedModel: any) => {
        console.log(`Service charge successfully created: ${savedModel.id}`);
      })
      .catch((e: any) => console.log(e));
  });

  testResidents.forEach((resident: Resident) => {
    const userModel = new UserModel(resident);
    userModel
      .save()
      .then((savedModel: any) => {
        console.log(`User successfully created: ${savedModel.id}`);
      })
      .catch((e: any) => console.log(e));
  });
};

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${BASE_URL}:${PORT}`);
  populateDbWithTestData();
});
