import { PaymentRequest } from 'models/PaymentRequest';
import { ServiceChargeRequest } from './ServiceChargeRequest';
export interface ServiceChargePayment {
    request: ServiceChargeRequest
    payment: PaymentRequest
}