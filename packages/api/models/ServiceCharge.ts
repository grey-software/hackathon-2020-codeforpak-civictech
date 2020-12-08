import { ResidentType } from "./ResidentType";
import { ServiceType } from "./ServiceType";
import { ServiceChargeResponse } from "./ServiceChargeResponse";
import { ServiceChargeRequest } from "./ServiceChargeRequest";
import { ResponseCode } from "./ResponseCode";
export interface ServiceCharge {
  request: ServiceChargeRequest;
  response: ServiceChargeResponse;
}

export const testServiceCharges: Array<ServiceCharge> = [
  {
    request: {
      amount: "string",
      request_date:
        "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      debit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "25367485943726",
      },
      credit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "25367485943726",
      },
      service_type: ServiceType.WASTE_COLLECTION,
      resident: {
        type: ResidentType.INDIVIDUAL,
        given_names: ["Muhammad", "Arsala", "Khan"],
        last_name: "Bangash",
        phone: "03139288208",
        cnic: "32443235456355",
        address: "CS House, Muzaffarabad",
      },
    },
    response: {
      status: ResponseCode.SUCCESS,
      message: "Service charge completed",
      payload: {
        transaction_id: "12345676543",
        timestamp: "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      },
    },
  },
  {
    request: {
      amount: "string",
      request_date:
        "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      debit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "78907485943726",
      },
      credit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "2536748594231243",
      },
      service_type: ServiceType.WASTE_COLLECTION,
      resident: {
        type: ResidentType.INDIVIDUAL,
        given_names: ["Muhammad", "Arsala", "Khan"],
        last_name: "Bangash",
        phone: "03139288208",
        cnic: "32443235456355",
        address: "CS House, Muzaffarabad",
      },
    },
    response: {
      status: ResponseCode.SUCCESS,
      message: "Service charge completed",
      payload: {
        transaction_id: "123456231123",
        timestamp: "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      },
    },
  },
  {
    request: {
      amount: "string",
      request_date:
        "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      debit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "2536748594334243",
      },
      credit_party: {
        name: "Muhammad Arsala Khan Bangash",
        phone: "03139288208",
        account_number: "2536748594324523",
      },
      service_type: ServiceType.WASTE_COLLECTION,
      resident: {
        type: ResidentType.INDIVIDUAL,
        given_names: ["Muhammad", "Arsala", "Khan"],
        last_name: "Bangash",
        phone: "03139288208",
        cnic: "32443235456355",
        address: "CS House, Muzaffarabad",
      },
    },
    response: {
      status: ResponseCode.SUCCESS,
      message: "Service charge completed",
      payload: {
        transaction_id: "123456762934",
        timestamp: "Tue Dec 08 2020 19:28:57 GMT+0500 (Pakistan Standard Time)",
      },
    },
  },
];
