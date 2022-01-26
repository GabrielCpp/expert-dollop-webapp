import { ApiService } from "../services-def";

export class HttpApi implements ApiService {
  private bundles = new Map<string, Record<string, string>>();

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

    const response = await fetch(
      `/api/translation/${ressourceId}/${language}/json_bundle`
    );

    if (response.ok) {
      const body: Record<string, string> = await response.json();
      this.bundles.set(bundleId, body);
      return body;
    }

    throw Error("Fail to fetch translations");
  }
}
