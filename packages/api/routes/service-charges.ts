import { ServiceChargeModel } from "../models/ServiceChargeModel";
import { processPayment } from "../services/PaymentService";
import express from "express";
import { ServiceChargeResponse } from "../models/ServiceChargeResponse";
import { ServiceChargeRequest } from "models/ServiceChargeRequest";

const ServiceChargesRouter = express.Router();

ServiceChargesRouter.post("/pay", processServiceChargePayment);
ServiceChargesRouter.get("/", getServiceCharges);
ServiceChargesRouter.get("/create-request", createServiceChargeRequest);

export { ServiceChargesRouter };

async function createServiceChargeRequest(req: express.Request, res: express.Response) {

  }

async function getServiceCharges(req: express.Request, res: express.Response) {
  const query = new Parse.Query("ServiceCharge");
  query
    .find()
    .then(function(results) {
      console.log(`Fetched service charges from DB: ${results}`);
      res.send(results);
    })
    .catch(function(error) {
      console.log("Error: " + error.code + " " + error.message);
      res.send("User Found");
    });
}

async function processServiceChargePayment(
  req: express.Request,
  res: express.Response
) {
  const serviceChargeRequest: ServiceChargeRequest = req.body.serviceChargeRequest;
  if (serviceChargeRequest === undefined) {
    res.send("Service charge payment payload was invalid.");
  }
  const serviceChargeResponse: ServiceChargeResponse = await processPayment(
    serviceChargeRequest
  );
  const serviceChargeModel = new ServiceChargeModel({
    request: serviceChargeRequest,
    response: serviceChargeResponse,
  });

  serviceChargeModel
    .save()
    .then((serviceCharge: any) => {
      console.log(
        `Service charge model successfully created: ${serviceCharge}`
      );
      res.send(`Service charge model successfully created: ${serviceCharge}`);
    })
    .catch((error: any) => {
      console.log("Error: " + error.message);
      res.send("Error when creating user: " + error);
    });
}
