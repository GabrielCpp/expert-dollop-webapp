import { Services } from "../../hooks";
import { useServices } from "../../shared/service-context";
import { AsyncRestCursor } from "../../shared/async-cursor";
import { Translation } from "../../generated";
import { addTranslations } from "./tables";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

export function useTranlationScope(
  routeName: string,
  ressourceId: string
): boolean {
  const { reduxDb, axios, routes } = useServices<Services>();
  const { i18n } = useTranslation();
  const isLoaded = useRef(false);
  const [isLoading, setLoading] = useState(true);

  async function fetch(): Promise<void> {
    const cursor = new AsyncRestCursor<Translation>(
      axios,
      500,
      (nextPageToken: string | undefined, limit: number) =>
        routes.render(
          routeName,
          { ressourceId, locale: i18n.language },
          { ...(nextPageToken && { nextPageToken }), limit }
        )
    );

    while (await cursor.next()) {
      addTranslations(reduxDb, cursor.data());
    }

    setLoading(false);
  }

  if (isLoaded.current === false) {
    isLoaded.current = true;
    fetch();
  }

  return isLoading;
}
