import { action, observable } from "mobx";

export interface ITranslations {
  [key: string]: ILocaleMessages;
}

export interface ILocaleMessages {
  [key: string]: string;
}

export class LocaleStore {
  @observable
  public locale: string = "en";

  @observable
  public translations: ITranslations;

  constructor(translations: ITranslations) {
    this.setTranslations(translations);
  }

  @action
  public setTranslations(translations: ITranslations) {
    this.translations = translations;
  }

  @action
  public setLocale(locale: string) {
    this.locale = locale;
  }
}
