/*eslint-disable @typescript-eslint/no-useless-constructor*/
import { ApiCommon } from "../ApiCommon";
import { TApiCommon, TResponse } from "../ApiCommon/types";
import {
  TTemplateMethodGetByIdResponse,
  TTemplateMethodGetResponse,
  TTemplateMethodPostRequestData,
  TTemplateMethodPostResponse,
} from "./types";

export class ApiClass extends ApiCommon {
  constructor(options?: TApiCommon) {
    super(options ?? "api");
  }

  public exampleMethodPost = <T = TTemplateMethodPostResponse>(
    data: TTemplateMethodPostRequestData
  ): TResponse<T> => {
    const path = "/posts";
    return this.post<T, TTemplateMethodPostRequestData>({ path, data });
  };

  public exampleMethodGetListPosts = <
    T = TTemplateMethodGetResponse
  >(): TResponse<T> => {
    const path = `/posts`;
    return this.get<T>({ path });
  };

  public exampleMethodGetPostById = <T = TTemplateMethodGetByIdResponse>(
    id: number
  ): TResponse<T> => {
    const path = `/posts/${id}`;
    return this.get<T>({ path });
  };
}
/*eslint-enable @typescript-eslint/no-useless-constructor*/
export const api = new ApiClass();
