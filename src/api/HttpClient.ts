import { BASE_URL } from "../config/endpoints";
import { localStorageUtils } from "../utils/LocalStorage";

interface HttpClientInterface {
  get(path: string): Promise<any>;
  post(path: string, params?: Object): Promise<any>;
  put(path: string, params?: Object): Promise<any>;
  patch(path: string, params?: Object): Promise<any>;
  delete(path: string, params?: Object): Promise<any>;
}

export class HttpClient implements HttpClientInterface {
  async get(path: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      headers: new Headers({ ...this.getAuthHeaders() }),
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  async post(path: string, params: any, isFormData = false): Promise<any> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      headers: new Headers({ ...this.getAuthHeaders(isFormData) }),
      body: isFormData ? params : JSON.stringify({ ...params }),
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  async put(path: string, params: any, isFormData = false): Promise<any> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "PUT",
      headers: new Headers({ ...this.getAuthHeaders(isFormData) }),
      body: isFormData ? params : JSON.stringify({ ...params }),
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  async patch(path: string, params: Object): Promise<any> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      headers: new Headers({ ...this.getAuthHeaders() }),
      body: JSON.stringify(params),
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  async delete(path: string, params?: Object): Promise<any> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      headers: { ...this.getAuthHeaders() },
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  private getAuthHeaders(isFormData = false): any {
    const headers: any = {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
      Accept: "application.json",
    };

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }
}

const httpClient = new HttpClient();

export { httpClient };
