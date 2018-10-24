import { addLocaleData } from "react-intl";
import * as en from "react-intl/locale-data/en";
import * as fr from "react-intl/locale-data/fr";

import { ITranslations } from "./store/LocaleStore";

addLocaleData([...en, ...fr]);

export function loadTranslations(): ITranslations {
  const locales = require.context("./locales", true, /[a-z0-9]+\.json$/i);
  const messages: ITranslations = {};
  locales.keys().forEach((key: string) => {
    const matched = key.match(/([a-z0-9]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}
