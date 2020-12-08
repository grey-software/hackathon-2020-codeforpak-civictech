import { ServiceChargeRequest } from './../models/ServiceChargeRequest';
import { ServiceChargeResponsePayload, ServiceChargeResponse } from "models/ServiceChargeResponse";
import { ResponseCode } from "../models/ResponseCode";

export const processPayment = async (
  serviceChargeRequest: ServiceChargeRequest
): Promise<ServiceChargeResponse> => {
  await setTimeout(() => {
    console.log(`Processing service charge request: ${serviceChargeRequest}`);
  }, 2000);
  const serviceChargeResponsePayload: ServiceChargeResponsePayload = {
      transaction_id: '12345678',
      timestamp: new Date().toDateString()
  }
  const serviceChargeResponse: ServiceChargeResponse = {
    status: ResponseCode.SUCCESS,
    message: `Service charge for ${serviceChargeRequest.service_type} successfully completed by ${serviceChargeRequest.debit_party.name} to ${serviceChargeRequest.credit_party.name} at ${serviceChargeResponsePayload.timestamp}`,
    payload: serviceChargeResponsePayload
  }
  return new Promise<ServiceChargeResponse>((resolve) => resolve(serviceChargeResponse));
};
