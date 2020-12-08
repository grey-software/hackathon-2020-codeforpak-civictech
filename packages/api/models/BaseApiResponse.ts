import { ResponseCode } from "./ResponseCode";

export interface BaseApiResponse {
  status: ResponseCode;
  message: string;
  payload: any
}
