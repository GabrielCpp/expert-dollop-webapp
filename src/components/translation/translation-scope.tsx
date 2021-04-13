import { Services } from "../../hooks";
import { useServices } from "../../shared/service-context";
import { AsyncRestCursor } from "../../shared/async-cursor";
import { Translation } from "../../generated";
import { addTranslations } from "./tables";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface TranslationScopeProps {
  name: string;
  ressourceId: string;
  children: JSX.Element;
}

export function TranslationScope({
  name,
  ressourceId,
  children,
}: TranslationScopeProps) {
  const { reduxDb, axios, routes } = useServices<Services>();
  const { i18n } = useTranslation();
  const [cursor, setCursor] = useState<
    AsyncRestCursor<Translation> | undefined
  >(
    new AsyncRestCursor<Translation>(
      axios,
      500,
      (nextPageToken: string | undefined, limit: number) =>
        routes.render(
          name,
          { ressourceId, locale: i18n.language },
          { ...(nextPageToken && { nextPageToken }), limit }
        )
    )
  );

  async function pullData(cursor: AsyncRestCursor<Translation>): Promise<void> {
    while (await cursor.next()) {
      addTranslations(reduxDb, cursor.data());
    }
  }

  if (cursor === undefined) {
    return children;
  }

  pullData(cursor).then(() => setCursor(undefined));

  return <></>;
}
