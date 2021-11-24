import axios, { AxiosPromise } from "axios";
import { getLocalStorageItem } from "./localStorage";

export const ORIGIN: string = window.location.origin;
const BASE_URL: string = ORIGIN.split(":").slice(0, 2).join(":");
const PORT: String = "5000";

export enum RequestType {
  POST = "POST",
  GET = "GET",
  PATCH = "PATCH",
}

export enum Endpoints {
  login = "users/login",
  myMentees = "users/me/mentees",
}

const getAuthHeaders = (): {} => {
  const token = getLocalStorageItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const sendRequest = (
  method: RequestType,
  endpoint: Endpoints,
  data?: {}
): AxiosPromise<any> => {
  return axios({
    method,
    url: `${BASE_URL}:${PORT}/${endpoint}`,
    data,
    headers: getAuthHeaders(),
  });
};
