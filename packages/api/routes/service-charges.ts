import { ServiceChargeModel } from "../models/ServiceChargeModel";
import { ServiceChargePayment } from "../models/ServiceChargePayment";
import { processPayment } from "../services/PaymentService";
import express from "express";
import { ServiceChargeRequest } from "../models/ServiceChargeRequest";
import { ServiceChargeResponse } from "../models/ServiceChargeResponse";
import { ResponseCode } from "models/ResponseCode";

const ServiceChargesRouter = express.Router();

ServiceChargesRouter.post("/pay", processServiceChargePayment);

export { ServiceChargesRouter };

async function processServiceChargePayment(
  req: express.Request,
  res: express.Response
) {
  const payment: ServiceChargePayment = req.body.payment;
  if (payment === undefined) {
    res.send("Service charge payment payload was invalid.");
  }
  const serviceChargeResponse: ServiceChargeResponse = await processPayment(
    payment.request
  );
  const serviceChargeModel = new ServiceChargeModel({
    request: payment.request,
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