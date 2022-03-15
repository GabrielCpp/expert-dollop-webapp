import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { head } from "lodash";

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: "map-to-known-lng",

  lookup(options) {
    let lng = head(
      languageDetector.detect([
        "cookie",
        "navigator",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain",
      ])
    );

    if (lng && lng.length === 5) {
      if (!["en-US", "fr-CA"].includes(lng)) {
        lng = "en-US";
      }
    } else if (lng && lng.length === 2) {
      if (!["en", "fr"].includes(lng)) {
        lng = "en";
      }
    }

    return lng;
  },

  cacheUserLanguage(lng, options) {
    languageDetector.cacheUserLanguage(lng, ["cookie"]);
  },
});

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    backend: {
      loadPath: "/{{ns}}.{{lng}}.json",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: true,
    },
    detection: {
      order: ["map-to-known-lng"],
      cookieOptions: { path: "/", sameSite: "strict" },
    },
  });
