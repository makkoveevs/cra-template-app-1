import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosService } from "../Axios";
import { TServiceName } from "../Axios/types";
import { TApiCommon } from "./types";

const DEFAULT_URL = process.env.API_URL || "http://localhost";

export class ApiCommon {
  private readonly url: string;
  private readonly serviceName: TServiceName;
  axios: AxiosInstance;

  constructor(options?: TApiCommon) {
    this.axios = new AxiosService().axios;
    if (typeof options === "undefined") {
      this.serviceName === "api";
      this.url = new AxiosService().serviceUrls["api"] ?? DEFAULT_URL;
    } else if (typeof options === "string") {
      this.serviceName = options;
      this.url = new AxiosService().serviceUrls[options] ?? DEFAULT_URL;
    } else {
      this.serviceName = "api";
      this.url = options.url ?? DEFAULT_URL;
    }
  }

  public getUrl = (path: string): string => `${this.url}${path}`;

  readonly post = <T, D>({
    path,
    data,
    config = {},
  }: {
    path: string;
    data?: D;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> =>
    this.axios.post<T>(this.getUrl(path), data, config);

  readonly patch = <T, D = Record<string, unknown>>({
    path,
    data,
    config = {},
  }: {
    path: string;
    data?: D;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> =>
    this.axios.patch<T>(this.getUrl(path), data, config);

  readonly delete = <T>({
    path,
    config = {},
  }: {
    path: string;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> =>
    this.axios.delete<T>(this.getUrl(path), config);

  readonly get = <T>({
    path,
    config = {},
  }: {
    path: string;
    config?: AxiosRequestConfig;
  }): Promise<AxiosResponse<T>> => this.axios.get<T>(this.getUrl(path), config);
}
