// Loads required libraries
require("dotenv").config();
var ParseDashboard = require("parse-dashboard");
const ParseServer = require("parse-server").ParseServer;
const Parse = require("parse/node");
var path = require("path");
import express from "express";
import { GeoLocation } from "./models/GeoLocation";
import { Payments } from "./models/Payment";
//import GeoLocation from "GeoLocation";
import { GeoPoint } from "parse";

import { UsersRouter } from "./routes/users";
import { PaymentsRouter } from "./routes/payments";

import BodyParser from "body-parser";

const PORT = 8000;
const BASE_URL = process.env.BASE_URL || "localhost";

var databaseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/dev";
if (!databaseUri) {
  console.log("DATABASE_URI not specified, falling back to localhost.");
}

console.log(`DATABASE_URI: ${databaseUri}`);

Parse.initialize(
  "template-backend-parse-express-ts",
  process.env.APP_MASTER_KEY
);
Parse.serverURL = `http://${BASE_URL}:${PORT}/api`;

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
  pass: process.env.DASHBOARD_PASS
}

console.log(userDetails)
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
    users: 
  [
    {
        user: process.env.DASHBOARD_USER,
        pass: process.env.DASHBOARD_PASS
    }
  ]
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

app.get("/", (_, res) =>
  res.send("Your backend is live! Visit /dashboard for more details!")
);

function createGeoLocationTestData(): Array<GeoLocation> {
  // generate models here
  let g1 = new GeoLocation("London Bridge", "51.507879", "-0.087732");
  let g2 = new GeoLocation("Hyde Park", "51.508610", "-0.163611");
  let g3 = new GeoLocation("Greenwich Park", "51.476688", "0.000130");

  var locations: GeoLocation[] = [g1, g2, g3];
  return locations;
}

function populateDbWithTestData() {
  const GameScore = Parse.Object.extend("GameScore");
  const gameScore = new GameScore();

  gameScore.set("score", 1337);
  gameScore.set("playerName", "Sean Plot");

  const GeoLocationDbModel = Parse.Object.extend("GeoLocation");

  const geoLocationModels: Array<GeoLocation> = createGeoLocationTestData();
  geoLocationModels.forEach((geoLoc) => {
    const geoLocationDbModel = new GeoLocationDbModel();
    geoLocationDbModel.set(GeoLocation.Latitude, geoLoc.latitude);
    geoLocationDbModel.set(GeoLocation.Longitude, geoLoc.longitude);
    geoLocationDbModel.set(GeoLocation.Name, geoLoc.nameOfLocation);
    geoLocationDbModel.save().then(
      (gameScore: any) => {
        // Execute any logic that should take place after the object is saved.
        console.log("New object created with objectId: " + gameScore.id);
      },
      (error: any) => {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log("Failed to create new object, with error code: " + error);
      }
    );
  });

  gameScore.save().then(
    (gameScore: any) => {
      // Execute any logic that should take place after the object is saved.
      console.log("New object created with objectId: " + gameScore.id);
    },
    (error: any) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      console.log("Failed to create new object, with error code: " + error);
    }
  );
}

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://${BASE_URL}:${PORT}`);
  populateDbWithTestData();
});
