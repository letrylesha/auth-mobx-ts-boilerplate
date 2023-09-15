import { RefreshTokenResponseInterface } from "../types/interfaces/RefreshToken.interface";
import { httpClient } from "./HttpClient";

export class AuthApi {
  private AUTH_ENDPOINT = "auth";

  public signUp = async (login: string, password: string): Promise<any> => { 
    const data = await httpClient.post(`${this.AUTH_ENDPOINT}/signup`, {
      login,
      password,
    });

    return data;
  };

  signIn = async (login: string, password: string): Promise<any> => {
    const data = await httpClient.post(`${this.AUTH_ENDPOINT}/signin`, {
      login,
      password,
    });

    return data;
  };

  refreshToken = async (refreshToken: string): Promise<any> => {
    const data = (await httpClient.post(`${this.AUTH_ENDPOINT}/refresh-token`, {
      refreshToken,
    })) as { data: RefreshTokenResponseInterface };

    return data;
  };
}

export const authApi = new AuthApi();
