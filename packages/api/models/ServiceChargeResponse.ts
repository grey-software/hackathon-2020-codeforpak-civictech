import { BaseApiResponse } from "./BaseApiResponse";

export interface ServiceChargeResponsePayload {
    transaction_id: string;
    timestamp: string;
}

export interface ServiceChargeResponse extends BaseApiResponse {
    payload: ServiceChargeResponsePayload
}
