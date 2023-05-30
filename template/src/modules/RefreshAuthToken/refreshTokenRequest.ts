import axios from "axios";
import { RESPONSE_DATA_KEYS, TGetAccessTokenResponseData } from "./types";
import {
  NOT_VALID_REFRESH_TOKEN_RESPONSE_STATUS,
  REFRESH_TOKEN_STORAGE_KEY,
  TOKEN_SAVE_DATE_STORAGE_KEY,
} from "src/constants/auth";

export const refreshTokenRequest = async (url: string): Promise<void> => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

  if (refresh_token === null) {
    return Promise.reject(new Error("No refresh token"));
  }

  return axios
    .post<TGetAccessTokenResponseData>(url, {
      refresh_token,
    })
    .then((res) => {
      if (res.status === 200) {
        RESPONSE_DATA_KEYS.forEach((key) =>
          localStorage.setItem(key, res.data[key])
        );
        localStorage.setItem(
          TOKEN_SAVE_DATE_STORAGE_KEY,
          Date.now().toString()
        );
        return;
      }
      if (res.status === NOT_VALID_REFRESH_TOKEN_RESPONSE_STATUS) {
        throw new Error("Refresh token not valid");
      }
      throw new Error("Error token refresh");
    });
};
