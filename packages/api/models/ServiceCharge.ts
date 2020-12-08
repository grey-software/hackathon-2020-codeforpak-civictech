import { ResidentType } from "./ResidentType";
import { ServiceType } from "./ServiceType";
import { ServiceChargeResponse } from "./ServiceChargeResponse";
import { ServiceChargeRequest } from "./ServiceChargeRequest";
import { ResponseCode } from "./ResponseCode";
export interface ServiceCharge {
  request: ServiceChargeRequest;
  response: ServiceChargeResponse;
}

export const generateTestServiceCharges = (count: number): Array<ServiceCharge> => {
  const testServiceCharges = [];
  for (let i = 0; i < count; i++) {
    const element: ServiceCharge = {
      request: {
        amount: "500",
        request_date: new Date().toISOString(),
        debit_party: {
          name: "Muhammad Arsala Khan Bangash",
          phone: "0313" + Math.floor(Math.random() * 10000000),
          account_number:  Math.floor(Math.random() * 1000000000).toString(),
        },
        credit_party: {
          name: "Muhammad Arsala Khan Bangash",
          phone: "0313" + Math.floor(Math.random() * 10000000),
          account_number: Math.floor(Math.random() * 1000000000).toString(),
        },
        service_type: ServiceType.WASTE_COLLECTION,
        resident: {
          type: ResidentType.INDIVIDUAL,
          given_names: ["Muhammad", "Arsala", "Khan"],
          last_name: "Bangash",
          phone: "0313" + Math.floor(Math.random() * 10000000),
          cnic:  Math.floor(Math.random() * 1000000000).toString(),
          address: "CS House, Muzaffarabad",
        },
      },
      response: {
        status: ResponseCode.SUCCESS,
        message: "Service charge completed",
        payload: {
          transaction_id:  Math.floor(Math.random() * 1000000000).toString(),
          timestamp: new Date().toISOString(),
        },
      },
    };
    testServiceCharges.push(element)
  }
  return testServiceCharges
};
