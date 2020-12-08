import { BaseApiResponse } from "./BaseApiResponse";

export interface PaymentResponsePayload {
    transaction_id: string;
    timestamp: string;
}

export interface PaymentResponse extends BaseApiResponse {
    payload: PaymentResponsePayload
}
