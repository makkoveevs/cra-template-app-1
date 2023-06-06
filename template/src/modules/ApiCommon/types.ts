import { AxiosResponse } from "axios";
import { TServiceName } from "../Axios/types";

export type TApiCommonCustom = {
  url?: string;
  handleRefreshAccessToken?: () => Promise<void>;
};

export type TApiCommon = TApiCommonCustom | TServiceName;

export type TResponse<T> = Promise<AxiosResponse<T>>;
