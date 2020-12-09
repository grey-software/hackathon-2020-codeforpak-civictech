import { ResidentType } from "./ResidentType";
import { ServiceType } from "./ServiceType";
import { ServiceChargeResponse } from "./ServiceChargeResponse";
import { ServiceChargeRequest } from "./ServiceChargeRequest";
import { ResponseCode } from "./ResponseCode";
import { ServiceChargeStatus } from "./ServiceChargeStatus";
export interface ServiceCharge {
  request: ServiceChargeRequest;
  response: ServiceChargeResponse;
}

export const generateTestServiceCharges = (
  count: number
): Array<ServiceCharge> => {
  const testServiceCharges = [];
  for (let i = 0; i < count; i++) {
    const requestDate = new Date();
    const dueDate = new Date();

    dueDate.setTime(requestDate.getTime() + 12 * 1000 * 60 * 60);
    dueDate.setHours(0);
    const element: ServiceCharge = {
      request: {
        amount: "500",
        request_date: requestDate.toISOString(),
        due_date: dueDate.toISOString(),
        status: ServiceChargeStatus.PENDING,
        debit_party: {
          name: "Muhammad Arsala Khan Bangash",
          phone: "0313" + Math.floor(Math.random() * 10000000),
          account_number: Math.floor(Math.random() * 1000000000).toString(),
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
          cnic: Math.floor(Math.random() * 1000000000).toString(),
          address: "CS House, Muzaffarabad",
        },
      },
      response: {
        status: ResponseCode.SUCCESS,
        message: "Service charge completed",
        payload: {
          transaction_id: Math.floor(Math.random() * 1000000000).toString(),
          timestamp: new Date().toISOString(),
        },
      },
    };
    testServiceCharges.push(element);
  }
  return testServiceCharges;
};
