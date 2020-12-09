import { ResponseCode } from "./ResponseCode";

export interface BaseApiResponse {
  status: ResponseCode;
  message: string;
  payload: any;
}

export const successResponse = (
  message: string,
  payload: any
): BaseApiResponse => {
  return {
    status: ResponseCode.SUCCESS,
    message: message,
    payload: payload,
  };
};

export const failResponse = (
  message: string,
  payload: any
): BaseApiResponse => {
  return {
    status: ResponseCode.FAIL,
    message: message,
    payload: payload,
  };
};

export const errorResponse = (
  message: string,
  payload: any
): BaseApiResponse => {
  return {
    status: ResponseCode.ERROR,
    message: message,
    payload: payload,
  };
};
