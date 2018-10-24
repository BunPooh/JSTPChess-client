/* tslint:disable */
/**
 * Organize css inclusion order:
 * the order matters and should not be sorted alphabetically
 */
import "reflect-metadata";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "./index.css";

/* tslint:enable */
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";

import App from "./App";
import { LocaleProvider } from "./components/LocaleProvider";
import { loadTranslations } from "./i18n";
import registerServiceWorker from "./registerServiceWorker";
import { AuthService } from "./services/auth";
import { LocaleStore } from "./store/LocaleStore";
import { RoomStore } from "./store/RoomStore";
import { UserStore } from "./store/UserStore";
import { WsStore } from "./store/WsStore";

const translations = loadTranslations();

const localeStore = new LocaleStore(translations);
const authService = new AuthService();
const wsStore = new WsStore();

const stores = {
  wsStore,
  localeStore,
  userStore: new UserStore(authService),
  roomStore: new RoomStore(wsStore),
  routerStore: new RouterStore()
};

if (!stores.userStore.user) {
  stores.userStore.initializeFromLocalStorage();
}

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

ReactDOM.render(
  <Provider {...stores}>
    <LocaleProvider localeStore={localeStore}>
      <Router history={history}>
        <App />
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
