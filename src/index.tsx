import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { RoomStore } from "./store/RoomStore";
import { UserStore } from "./store/UserStore";

const stores = {
  userStore: new UserStore(),
  roomStore: new RoomStore(),
  routerStore: new RouterStore()
};

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
