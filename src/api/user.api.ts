import { httpClient } from "./HttpClient";

export class UserApi {
  private USER_ENDPOINT = "user";

  public getUser = async (): Promise<any> => {
    const data = await httpClient.get(`${this.USER_ENDPOINT}/info`);

    return data;
  };
}

export const userApi = new UserApi();
