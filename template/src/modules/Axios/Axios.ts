import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosRequestConfigWithDelayed, TServiceUrlsConfig } from "./types";
import { API_SERVICE_LOCATION, API_SERVICE_URL } from "./constants";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  APP_LOGIN_LOCATIOIN,
  DELAY_BETWEEN_RETRY_MS,
  EXPIRED_TOKEN_RESPONSE_STATUS,
  IS_REFRESHING_STORAGE_KEY,
  MAX_RETRY_COUNT,
  REFRESH_TOKEN_STORAGE_KEY,
  TOKEN_TYPE_STORAGE_KEY,
} from "src/constants/auth";

let axiosSingletoneInstance: AxiosService | undefined;

const DEFAULT_SERVICE_URLS: Required<TServiceUrlsConfig> = {
  api: API_SERVICE_URL + "/" + API_SERVICE_LOCATION,
};

export class AxiosService {
  public axios: AxiosInstance;
  private retryCounter = 0;
  private readonly handleRefreshAccessToken: () => Promise<void>;
  public serviceUrls: TServiceUrlsConfig = DEFAULT_SERVICE_URLS;

  constructor(
    {
      options = {},
      handleRefreshAccessToken = () =>
        Promise.reject(new Error("Refresh token method not setted")),
    }: {
      options: AxiosRequestConfig;
      handleRefreshAccessToken?: () => Promise<void>;
    } = {
      options: {},
      handleRefreshAccessToken: () =>
        Promise.reject(new Error("Refresh token method not setted")),
    }
  ) {
    if (typeof axiosSingletoneInstance !== "undefined") {
      return axiosSingletoneInstance;
    }

    this.handleRefreshAccessToken = handleRefreshAccessToken;

    this.axios = Axios.create({
      ...options,
      validateStatus: (status) => status >= 200 && status < 400,
      timeout: options.timeout || 30000,
      headers: {
        Accept: "application/json",
        ...(options ?? {}).headers,
      },
    });

    this.initRequestHeadersInterceptors();
    this.initResponseRefreshAccessTokenProcessInterceptors();

    axiosSingletoneInstance = this;
    return axiosSingletoneInstance;
  }

  private readonly initRequestHeadersInterceptors = (): void => {
    this.axios.interceptors.request.use(
      (config) =>
        // config["delayed"] - custom key, indicating that this request is being re-executed
        // if there is such a key, we delay DELAY_BETWEEN_RETRY_MS before executing
        new Promise((resolve) =>
          setTimeout(
            () => {
              const accessToken = localStorage.getItem(
                ACCESS_TOKEN_STORAGE_KEY
              );
              const tokenType = localStorage.getItem(TOKEN_TYPE_STORAGE_KEY);

              if (tokenType && accessToken) {
                config.headers = {
                  ...config.headers,
                  Authorization: `${tokenType} ${accessToken}`,
                };
              }
              resolve(config);
            },
            (config as AxiosRequestConfigWithDelayed)["delayed"]
              ? DELAY_BETWEEN_RETRY_MS
              : 0
          )
        )
    );
  };

  private readonly initResponseRefreshAccessTokenProcessInterceptors =
    (): void => {
      this.axios.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => {
          this.retryCounter = 0;
          localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
          return response;
        },

        async (error: any): Promise<any> => {
          if (error.response.status === EXPIRED_TOKEN_RESPONSE_STATUS) {
            //remeber the originalRequest to repeat it later
            const originalRequest =
              error.config as AxiosRequestConfigWithDelayed;

            const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
            const refreshToken = localStorage.getItem(
              REFRESH_TOKEN_STORAGE_KEY
            );
            const refreshTokenFlag = localStorage.getItem(
              IS_REFRESHING_STORAGE_KEY
            );

            // 1. variant
            // if:
            // - response.status === EXPIRED_TOKEN_RESPONSE_STATUS
            // - no exists IS_REFRESHING_STORAGE_KEY in localStorage,

            // then:
            // - accessToken is expires

            // in this case need to do:
            // - set flag in local storage - IS_REFRESHING_STORAGE_KEY
            // - execute a request to update an access token
            // - rerun originalRequest

            // if error on update token process:
            // - remove flag IS_REFRESHING_STORAGE_KEY
            // - remove access and refresh tokens
            if (refreshTokenFlag === null) {
              if (refreshToken === null) {
                // if refresh token no exists then go to login page
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                location.replace(APP_LOGIN_LOCATIOIN);
                return Promise.reject(new Error("Not find refresh token"));
              }
              try {
                // set the token update progress flag and launch the token update request
                localStorage.setItem(IS_REFRESHING_STORAGE_KEY, "true");
                await this.handleRefreshAccessToken();
                // we remove the sign of the token refresh, reset the counter of attempts and restart the original request
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                this.retryCounter = 0;
                return this.axios(originalRequest);
              } catch (e: any) {
                this.retryCounter = 0;
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
                location.replace(APP_LOGIN_LOCATIOIN);
                return Promise.reject(new Error(e));
              }
            }

            // 2. variant
            //   if:
            //   - response.status === EXPIRED_TOKEN_RESPONSE_STATUS
            //   - inlocalStorage exists flag IS_REFRESHING_STORAGE_KEY

            //   then:
            //   - in another request, the process of updating the access token is in progress

            //   in this case to do:
            //   - wait DELAY_BETWEEN_RETRY_MS milliseconds
            //   - re-execute the original request - in the hope that the new access token will be hooked by the interceptor
            //   - IMPORTANT - try MAX_RETRY_COUNT iteration with interval DELAY_BETWEEN_RETRY_MS milliseconds between iterations

            //   if error:
            //   - generate an error to display the authorization page
            //   - remove tokens from localStorage
            if (refreshTokenFlag !== null) {
              if (this.retryCounter < MAX_RETRY_COUNT) {
                this.retryCounter++;

                originalRequest["delayed"] = true;
                return this.axios(originalRequest);
              } else {
                this.retryCounter = 0;
                localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
                localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
                localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
                location.replace(APP_LOGIN_LOCATIOIN);
                return Promise.reject(new Error("Go to login page"));
              }
            }

            // 3. variant
            //  if:
            //  - response.status === EXPIRED_TOKEN_RESPONSE_STATUS
            //  - there is neither an access token nor a refresh token in the storage, nor a flag for executing the process of updating an access token

            //  then:
            //  - no authorized

            //  to do:
            //  - generate an error to display the authorization page
            if (
              accessToken === null &&
              refreshToken === null &&
              refreshTokenFlag === null
            ) {
              this.retryCounter = 0;
              localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
              location.replace(APP_LOGIN_LOCATIOIN);
              return Promise.reject(new Error("Go to login page"));
            }
          } else {
            localStorage.removeItem(IS_REFRESHING_STORAGE_KEY);
            // if somehow they came here, then there is nothing good either
            return Promise.reject(error);
          }
        }
      );
    };

  public setServiceUrlsConfig = (data: TServiceUrlsConfig): void => {
    this.serviceUrls = {
      ...DEFAULT_SERVICE_URLS,
      ...this.serviceUrls,
      ...data,
    };
  };
}
