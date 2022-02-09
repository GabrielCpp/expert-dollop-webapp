import { Services, HttpRequestService } from "../services-def";

export class HttpFetchService implements HttpRequestService {
  options: RequestInit;
  getServices: () => Services;

  public constructor(getServices: () => Services) {
    this.getServices = getServices;
    this.options = {
      mode: "cors",
      cache: "default",
    };
  }

  async get(url: string): Promise<Response> {
    const services = this.getServices();
    const token = await services.auth0.getToken();

    return fetch(url, {
      ...this.options,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async post(url: string, body: BodyInit): Promise<Response> {
    const services = this.getServices();
    const token = await services.auth0.getToken();

    return fetch(url, {
      ...this.options,
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
