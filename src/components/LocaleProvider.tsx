import { observer } from "mobx-react";
import * as React from "react";
import { IntlProvider } from "react-intl";

import { LocaleStore } from "../store/LocaleStore";

interface IComponentProps {
  children: any | undefined;
  localeStore: LocaleStore;
}

export const LocaleProvider = observer((props: IComponentProps) => {
  const locale = props.localeStore.locale;
  const messages = props.localeStore.translations[locale];

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      children={props.children}
    />
  );
});
