import { ServiceChargeStatus } from './ServiceChargeStatus';
import { DebitCreditParty } from "./DebitCreditParty";
import { Resident } from "./Resident";
import { ServiceType } from "./ServiceType";

export interface ServiceChargeRequest {
  amount: string;
  request_date: string;
  due_date: string;
  status: ServiceChargeStatus;
  debit_party: DebitCreditParty;
  credit_party: DebitCreditParty;
  service_type: ServiceType;
  resident: Resident;
}
