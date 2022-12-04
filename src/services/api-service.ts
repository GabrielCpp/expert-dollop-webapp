import { ApiService, Services, HttpRequestService } from "../services-def";

export class HttpApi implements ApiService {
  private bundles = new Map<string, Record<string, string>>();
  private getServices: () => Services;

  public constructor(getServices: () => Services) {
    this.getServices = getServices;
  }

  public async loadTranslations(
    ressourceId: string,
    language: string,
    force = false
  ): Promise<Record<string, string>> {
    const bundleId = `${ressourceId}-${language}`;
    const bundle = this.bundles.get(bundleId);

    if (bundle !== undefined && !force) {
      return bundle;
    }

    const response = await this.http.get(
      `/api/translations/${ressourceId}/json_bundle?locale=${language}`
    );

    if (response.ok) {
      const body: Record<string, string> = await response.json();
      this.bundles.set(bundleId, body);
      return body;
    }

    throw Error("Fail to fetch translations");
  }

  private get http(): HttpRequestService {
    return this.getServices().http;
  }
}
