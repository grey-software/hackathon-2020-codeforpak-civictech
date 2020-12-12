import { failResponse, successResponse } from "./../models/BaseApiResponse";
import { UserModel } from "./../models/UserModel";
import express from "express";
import { Attributes, User } from "parse/node";
import webPush from "web-push";
const atob = require("atob");
const PushRouter = express.Router();

const vapidKeys = {
  publicKey: process.env.VAPID_PUB_KEY,
  privateKey: process.env.VAPID_PRI_KEY,
};
console.log(vapidKeys);

webPush.setVapidDetails(
  "mailto:greykhan@open-gov.grey.software",
  vapidKeys.publicKey || "",
  vapidKeys.privateKey || ""
);

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey = vapidKeys.publicKey;
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey || "");
console.log(convertedVapidKey);

const sendPushNotification = async (
  req: express.Request,
  res: express.Response
) => {
  const message = req.body.message;
  const phone = req.body.phone;
  const query = new Parse.Query(User);
  query.equalTo("phone", phone);
  query
    .first()
    .then((user: User<Attributes> | undefined) => {
      if (user === undefined) {
        res.send(failResponse(`No user with phone: ${phone} found`, {}));
      } else {
        const subscription = user.get("subscription");
        webPush.sendNotification(subscription, message);
      }
    })
    .catch((e) => {
      console.log(e);
      res.send(`Error sending a notification to user with phone: ${phone}`);
    });
};

const addSubscription = async (req: express.Request, res: express.Response) => {
  const subscription = req.body.subscription;
  const phone = req.body.phone;
  const cnic = req.body.cnic;
  const query = new Parse.Query(User);
  query.equalTo("phone", phone);
  query.equalTo("cnic", cnic);
  query
    .first()
    .then((user: User<Attributes> | undefined) => {
      if (user === undefined) {
        res.send(
          failResponse(
            `No user with phone: ${phone} and cnic: ${cnic} found`,
            {}
          )
        );
      } else {
        const authCode = Math.floor(Math.random() * 100000)
        user.set("subscription", subscription);
        user.set("authCode", authCode)
        user
          .save()
          .then((user: User) => {
            console.log("User push subscription details saved");
            res.send(
              successResponse(
                `Successfully saved subscription details for user with phone: ${phone}`,
                {}
              )
            );
            webPush.sendNotification(subscription, `Your code is ${authCode}`)
          })
          .catch((e) => {
            console.log(e);
            res.send(
              `Error when saving subscription details for user with phone: ${phone}`
            );
          });
      }
    })
    .catch((e) => {
      console.log(e);
      res.send(
        `Error when saving subscription details for user with phone: ${phone}`
      );
    });
};

const savePushSubscription = (
  userModel: User<Attributes>,
  subscription: any
) => {
  userModel.set("subscription", subscription);
  userModel.save();
};

PushRouter.post("/add-subscription", addSubscription);

export { PushRouter };
