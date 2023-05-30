import { AxiosRequestConfig } from "axios";

export type TServiceName = "api";
export type TServiceUrlsConfig = Partial<Record<TServiceName, string>>;

export interface AxiosRequestConfigWithDelayed<D = any>
  extends AxiosRequestConfig<D> {
  delayed?: boolean;
}
